// import React, { useState, useEffect } from 'react';
// import { Form, Button, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import './Login.css';
// import { useAuth } from '../AuthContext';
// import {backendip} from '../../utils/const'

// export default function Login() {
//     const { hasToken, setToken } = useAuth();
//     const [step, setStep] = useState(1);
//     const [mobileNumber, setMobileNumber] = useState('');
//     const [otp, setOtp] = useState('');
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (hasToken) {
//             navigate('/');
//         }
//     }, [hasToken, navigate]);

//     const handleMobileNumberSubmit = (e) => {
//         e.preventDefault();
//         setStep(2);
//     };

//     const handleOtpSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch(backendip + '/api/auth/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ mobileNumber, otp }),
//             });

//             const data = await response.json();
//             console.log(data);

//             if (data.token) {
//                 setToken(data.token); // Update context state and localStorage
//                 navigate('/'); // Navigate to the home page
//             } else {
//                 setError('Invalid OTP');
//             }
//         } catch (err) {
//             setError('Error verifying OTP');
//         }
//     };

//     return (
//         <div className="login-container">
//             <h3 className="login-title">{step === 1 ? 'Enter Mobile Number' : 'Enter OTP'}</h3>
//             {error && <Alert variant="danger">{error}</Alert>}
//             {success && <Alert variant="success">{success}</Alert>}
//             {step === 1 ? (
//                 <Form onSubmit={handleMobileNumberSubmit}>
//                     <Form.Group controlId="formMobileNumber">
//                         <Form.Control
//                             type="text"
//                             placeholder="Mobile Number"
//                             value={mobileNumber}
//                             onChange={(e) => setMobileNumber(e.target.value)}
//                             required
//                         />
//                     </Form.Group>
//                     <Button variant="primary" type="submit" className="w-100">
//                         Proceed to OTP
//                     </Button>
//                 </Form>
//             ) : (
//                 <Form onSubmit={handleOtpSubmit}>
//                     <Form.Group controlId="formOtp">
//                         <Form.Control
//                             type="text"
//                             placeholder="Enter OTP"
//                             value={otp}
//                             onChange={(e) => setOtp(e.target.value)}
//                             required
//                         />
//                     </Form.Group>
//                     <Button variant="primary" type="submit" className="w-100">
//                         Verify OTP
//                     </Button>
//                 </Form>
//             )}
//         </div>
//     );
// }


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './Login.css';
import { backendip } from '../../utils/const';

export default function Login() {
    const { setToken } = useAuth();
    const [error, setError] = useState('');
    const navigate = useNavigate();



    useEffect(() => {
        // OTPless callback
        window.otpless = (otplessUser) => {
            console.log("OTPless User:", otplessUser);
            fetch(backendip + '/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: otplessUser.userId, token: otplessUser.token, phone_number: otplessUser.identities[0].identityValue  }),
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.token) {
                    setToken(data.token); // Save token and log the user in
                    navigate('/'); // Navigate to the home page
                } else {
                    setError('Login failed. Please try again.');
                }
            })
            .catch((err) => {
                setError('Error during login');
                console.error(err);
            });
        };
    }, [setToken, navigate]);

    return (
        <div className="login-container">
              <h1>Amrit</h1>
            {/* <h3 className="login-title">Login with OTPless</h3> */}
            {error && <p className="error-message">{error}</p>}
       
            <div id="otpless-login-page"></div>

            <div>
  <input id="mobile-input" placeholder="Enter mobile number" />
  <button onclick="phoneAuth()">Request OTP</button>
</div>

<div id="otp-section" style="display: none;">
  <input id="otp-input" placeholder="Enter OTP" />
  <button onclick="verifyOTP()">Verify OTP</button>
</div>

<button onclick="oauth('WHATSAPP')">Continue with WhatsApp</button>
<button onclick="oauth('GMAIL')">Continue with Gmail</button>

        </div>
    );
}
