import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // Ensure this CSS file is created and included
import MyForms from '../MyForms/MyForms';

export default function Profile() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove the token from local storage or session storage
        localStorage.removeItem('token'); // Adjust this if you use session storage or another method

        // Redirect to the login page
        navigate('/login');
    };

    return (
        <>
        <div className="profile-container">
            <div className="profile-header">
                <img
                    src="https://static.vecteezy.com/system/resources/previews/007/296/443/original/user-icon-person-icon-client-symbol-profile-icon-vector.jpg"
                    alt="Profile"
                    className="profile-picture"
                />
                <h1 className="profile-name">Amrit Kumar</h1>
            </div>
            <div className="status-container">
                <div className="status-item">
                    <span className="status-label">Form Applied</span>
                    <span className="status-count">0</span>
                </div>
                <div className="status-item">
                    <span className="status-label">Completed</span>
                    <span className="status-count">0</span>
                </div>
            </div>
            <div className="button-container">
                <button className="profile-button" onClick={() => navigate('/myforms')}>My Forms</button>
                <button className="profile-button" onClick={() => navigate('/')}>New Forms</button>
                <button className="profile-button logout-button" onClick={handleLogout}>Logout</button>
            </div>
            </div>
            <MyForms />
        </>
    );
}
