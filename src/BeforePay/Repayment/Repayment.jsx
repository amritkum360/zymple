import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../BeforePay.css';

const Repay = () => {
    const { id } = useParams(); // Get form ID from URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);
    const [selectedCaste, setSelectedCaste] = useState(null);
    const [paidAmount, setPaidAmount] = useState(null); // State to hold paid amount
    const [loading, setLoading] = useState(true);
    const [paymentStatus, setPaymentStatus] = useState(false); // Track payment status

    useEffect(() => {
        const fetchFormData = async () => {
            try {
                const response = await axios.get(`http://localhost:3003/api/forms/forms/${id}`); // Fetch form data from backend
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching form data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFormData();
    }, [id]); // Remove navigate from dependencies

    const handleCasteSelect = (caste, amount) => {
        setSelectedCaste(caste);
        setPaidAmount(amount); // Set paid amount based on selected caste
    };

    const getUserIdFromToken = () => {
        const token = localStorage.getItem('token'); // Adjust if the token is stored elsewhere
        if (token) {
            try {
                const decoded = JSON.parse(atob(token.split('.')[1])); // Simple decoding, adjust for your JWT structure
                return decoded.userId; // Adjust based on how you store user ID in the token
            } catch (e) {
                console.error('Error decoding token', e);
            }
        }
        return null;
    };

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayNow = async () => {
        const formId = formData._id;
        const userId = getUserIdFromToken();

        if (!userId || !selectedCaste || !paidAmount) {
            console.error('Required information missing');
            return;
        }

        // Load the Razorpay script
        const scriptLoaded = await loadRazorpayScript();

        if (!scriptLoaded) {
            console.error('Razorpay SDK failed to load.');
            return;
        }

        try {
            // Create an order on the backend
            const orderResponse = await axios.post('http://localhost:4000/order', {
                amount: paidAmount * 100, // Amount in paise
                currency: 'INR',
                receipt: `receipt_${formId}_${userId}`,
            });

            const order = orderResponse.data;

            const options = {
                key: 'rzp_test_MFJhFPo2B6EehL', // Replace with your Razorpay key ID
                amount: order.amount,
                currency: order.currency,
                name: formData.formname,
                description: 'Payment for form submission',
                image: 'https://yourlogo.com/logo.png', // Replace with your logo
                order_id: order.id,
                handler: async function (response) {
                    const paymentData = {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    };

                    try {
                        await axios.post('http://localhost:4000/order/validate', paymentData);

                        await axios.post('http://localhost:3003/api/paidamount', {
                            formId,
                            user: userId,
                            caste: selectedCaste,
                            paidAmount
                        });

                        setPaymentStatus(true); // Set payment status to true after successful payment
                        navigate(`/formstatus/${formId}`);
                    } catch (error) {
                        console.error('Error processing payment:', error);
                    }
                },
                prefill: {
                    name: 'Your Name', // Replace with user's name
                    email: 'email@example.com', // Replace with user's email
                    contact: '9999999999', // Replace with user's contact number
                },
                theme: {
                    color: '#3399cc',
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error('Error initiating payment:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!formData) {
        return <p>Form not found</p>;
    }

    const pricingDetails = formData.pricingDetails || { caste: [], charge: [] }; // Default to empty arrays if undefined

    return (
        <div className="outer-container-bp">
            <div className="container-bp">
                <h1 className="heading-bp">{formData.formname}</h1>
                <p>{formData.description}</p>

                <h3 className="heading-bp">Required Documents:</h3>
                <ul>
                    {formData.requireddocs.length > 0 ? (
                        formData.requireddocs.map((doc, index) => (
                            <li key={index} className="list-item-bp">{doc}</li>
                        ))
                    ) : (
                        <p>No documents required</p>
                    )}
                </ul>

                <h3 className="heading-bp">Pricing:</h3>
                {pricingDetails.caste.length > 0 ? (
                    <div className="caste-container-bp">
                        {pricingDetails.caste.map((caste, index) => (
                            <div
                                key={index}
                                className={`caste-card-bp ${selectedCaste === caste ? 'selected' : ''}`}
                                onClick={() => handleCasteSelect(caste, pricingDetails.charge[index])}
                            >
                                <h2 className="caste-name-bp">{caste}</h2>
                                <p className="caste-price-bp">₹{pricingDetails.charge[index]}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No pricing information available</p>
                )}

                <h3 className="heading-bp">Tags:</h3>
                <div>
                    {formData.tags.length > 0 ? (
                        formData.tags.map((tag, index) => (
                            <span key={index} className="list-item-bp">{tag}</span>
                        ))
                    ) : (
                        <p>No tags available</p>
                    )}
                </div>
            </div>

            {!paymentStatus && selectedCaste && (
                <button className="pay-button-bp" onClick={handlePayNow}>
                    <span className="pay-button-text-bp">Pay Now</span>
                </button>
            )}
        </div>
    );
};

export default Repay;
