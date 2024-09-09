import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useAuth } from '../AuthContext';
import {backendip} from '../../utils/const'

export default function Login() {
    const { hasToken, setToken } = useAuth();
    const [step, setStep] = useState(1);
    const [mobileNumber, setMobileNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (hasToken) {
            navigate('/');
        }
    }, [hasToken, navigate]);

    const handleMobileNumberSubmit = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(backendip + ':3003/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mobileNumber, otp }),
            });

            const data = await response.json();
            console.log(data);

            if (data.token) {
                setToken(data.token); // Update context state and localStorage
                navigate('/'); // Navigate to the home page
            } else {
                setError('Invalid OTP');
            }
        } catch (err) {
            setError('Error verifying OTP');
        }
    };

    return (
        <div className="login-container">
            <h3 className="login-title">{step === 1 ? 'Enter Mobile Number' : 'Enter OTP'}</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            {step === 1 ? (
                <Form onSubmit={handleMobileNumberSubmit}>
                    <Form.Group controlId="formMobileNumber">
                        <Form.Control
                            type="text"
                            placeholder="Mobile Number"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                        Proceed to OTP
                    </Button>
                </Form>
            ) : (
                <Form onSubmit={handleOtpSubmit}>
                    <Form.Group controlId="formOtp">
                        <Form.Control
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                        Verify OTP
                    </Button>
                </Form>
            )}
        </div>
    );
}
