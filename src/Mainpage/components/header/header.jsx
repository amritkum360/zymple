// src/Header.js
import React, { useState, useEffect } from 'react';
import { Navbar, Form, FormControl, Button, Nav } from 'react-bootstrap';
import './header.css'; // Import custom CSS for additional styling
import { FaHome, FaUser, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons'; // Import the form icon
import { useNavigate } from 'react-router-dom'; // Updated to use useNavigate

const Header = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = useNavigate(); // Updated to use useNavigate

    useEffect(() => {
        // Check if token exists to determine authentication status
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const handleLogout = () => {
        // Remove token from local storage
        localStorage.removeItem('token');
        // Update authentication status
        setIsAuthenticated(false);
        // Redirect to the home page
        navigate('/');
    };

    return (
        <Navbar bg="light" expand="lg" className="custom-navbar sticky-top">
            <Navbar.Brand href="#home" className="logo">
                Zymple
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Form inline className="mx-auto search-form">
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" style={{ width: "600px" }} />
                    {/*<Button variant="outline-success">Search</Button>*/}
                </Form>
                <Nav className="ml-auto">
                    <Nav.Item>
                        <Nav.Link href="/" className="nav-link">
                            <FaHome className="nav-icon" />
                            <div className="menuItem">Home</div>
                        </Nav.Link>
                    </Nav.Item>
                    {isAuthenticated && (
                      <>
                    <Nav.Item>
                        <Nav.Link href="/profile" className="nav-link">
                            <FaUser className="nav-icon" />
                            <div className="menuItem">Profile</div>
                        </Nav.Link>
                    </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/myforms" className="nav-link">
                                <FontAwesomeIcon icon={faFileAlt} className="nav-icon" /> {/* Form icon */}
                                <div className="menuItem">My Forms</div>
                            </Nav.Link>
                            </Nav.Item></> 
                    )}
                    <Nav.Item>
                        {isAuthenticated ? (
                            <Nav.Link href="#logout" className="nav-link logout" onClick={handleLogout}>
                                <FaSignOutAlt className="nav-icon" />
                                <div className="menuItem">Logout</div>
                            </Nav.Link>
                        ) : (
                            <Nav.Link href="/login" className="nav-link login">
                                <FaSignInAlt className="nav-icon" />
                                <div className="menuItem">Login</div>
                            </Nav.Link>
                        )}
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
