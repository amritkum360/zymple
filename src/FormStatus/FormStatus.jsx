import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './FormStatus.css';
import { getUserIdFromToken } from '../utils/auth';
import Fswarning from './components/fswarning/fswarning';
import { backendip } from '../utils/const';

const FormStatus = () => {
    const { id: formId } = useParams(); // Get the form ID from URL params
    const userId = getUserIdFromToken();
    const [formStatus, setFormStatus] = useState('');
    const [activeStep, setActiveStep] = useState(-1); // Initialize with -1 to catch issues
    const navigate = useNavigate(); // Use navigate for redirection

    const steps = [
        { label: 'Started', showButton: false },
        { label: 'Payment Done', showButton: true, buttonText: 'Repayment' },
        { label: 'Document Uploaded', showButton: true, buttonText: 'Re-upload' },
        { label: 'Form Filling Started', showButton: false },
        { label: 'Form Filled', showButton: false },
        { label: 'Sent', showButton: false },
    ];

    useEffect(() => {
        // Fetch form status from backend
        fetch(backendip + `/api/status/formstatus/${formId}/${userId}`)
            .then(response => response.text())
            .then(text => {
                let data;
                try {
                    data = JSON.parse(text); // Attempt to parse JSON
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    return; // Exit if JSON parsing fails
                }

                if (data && data.status) {
                    setFormStatus(data.status);
                    const stepIndex = steps.findIndex(step => step.label === data.status);
                    setActiveStep(stepIndex);
                } else {
                    console.error('Form status data not found in response:', data);
                }
            })
            .catch(error => console.error('Error fetching form status:', error));
    }, [formId, userId]);

    useEffect(() => {
        // Handle back button press on both mobile and desktop browsers
        const handleBackButton = (event) => {
            event.preventDefault(); // Prevent default back button behavior
            navigate('/'); // Navigate to home page
        };

        // Push a new entry to the history to handle back navigation
        window.history.pushState(null, null, window.location.href);

        // Listen to popstate event
        window.addEventListener('popstate', handleBackButton);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('popstate', handleBackButton);
        };
    }, [navigate]);

    const handleButtonClick = (step) => {
        if (step.label === 'Payment Done') {
            // Redirect to /repay/id when Repayment button is clicked
            navigate(`/repay/${formId}`);
        } else if (step.label === 'Document Uploaded') {
            // Handle re-upload logic here
            navigate(`/reupload/${formId}`);
            console.log('Re-upload button clicked');
        }
    };

    return (
        <>
            <Fswarning />
            <div className="form-status-container">
                <h1>Form Status</h1>
                <div className="stepper">
                    {steps.map((step, index) => (
                        <div key={index} className={`step ${index <= activeStep ? 'active' : ''}`}>
                            <div className="step-number">{index + 1}</div>
                            <div className="step-label">
                                {step.label}
                                {index <= activeStep && step.showButton && (
                                    <button className="step-button" onClick={() => handleButtonClick(step)}>
                                        {step.buttonText}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <p className="current-status">Current Status: {formStatus || 'Loading...'}</p>
            </div>
        </>
    );
};

export default FormStatus;
