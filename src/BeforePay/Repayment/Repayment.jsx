import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { load } from '@cashfreepayments/cashfree-js';
import '../BeforePay.css';
import { backendip, razorpayip } from '../../utils/const';

let cashfree; // Initialize Cashfree variable

// Initialize Cashfree SDK
const initializeSDK = async () => {
  cashfree = await load({
    mode: 'sandbox' // Use 'production' for live transactions
  });
};


const Repay = () => {
    const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [formId, setFormId] = useState(null); // Initially set to null
  const [selectedCaste, setSelectedCaste] = useState(null);
  const [paidAmount, setPaidAmount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState(false);
   const [userId, setUserId] = useState(null)


    useEffect(() => {

        initializeSDK();

        const fetchFormData = async () => {
            try {
                const response = await axios.get(`${backendip}/api/forms/forms/${id}`);
                setFormData(response.data);
                setFormId(response.data._id); // Set formId after data is fetched
                console.log('Form Data:', response.data);
                const userId = getUserIdFromToken();
                setUserId(userId)
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

    // const loadRazorpayScript = () => {
    //     return new Promise((resolve) => {
    //         const script = document.createElement('script');
    //         script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    //         script.onload = () => resolve(true);
    //         script.onerror = () => resolve(false);
    //         document.body.appendChild(script);
    //     });
    // };

    const handlePayNow = async () => {
        const userId = getUserIdFromToken();
    
        if (!userId || !selectedCaste || !paidAmount || !formId) {
          console.error('Required information missing');
          return;
        }
    
        try {
          // Create an order on the backend
          const orderResponse = await axios.post(`http://localhost:3000/create-order`, {
            orderId: Date.now().toString(),
            customerPhone: '9999999999', // Replace with actual customer phone
            customerId: userId, // Replace with actual customer ID
            amount: paidAmount, // Amount should be in your preferred format
          });
    
          if (orderResponse.data && orderResponse.data.payment_session_id) {
            const sessionId = orderResponse.data.payment_session_id; // Get session ID from response
            doPayment(sessionId); // Proceed to payment
          } else {
            console.error('Failed to create order:', orderResponse.statusText);
          }
        } catch (error) {
          console.error('Error initiating payment:', error);
        }
      };

      const doPayment = async (sessionid) => {
        console.log("session", sessionid);
        let checkoutOptions = {
          paymentSessionId: sessionid,
          redirectTarget: "_modal",
        };
      
        cashfree.checkout(checkoutOptions).then(async (result) => {
          console.log(result)
          if (result.error) {
            console.log("User has closed the popup or there is some payment error, Check for Payment Status");
            console.log(result.error);
          } else if (result.redirect) {
            console.log("Payment will be redirected");
          } else if (result.paymentDetails) {
            console.log("Payment has been completed, Check for Payment Status");
            console.log(result.paymentDetails.paymentMessage);
            console.log('form id', formId)
            // Call separate functions for handling payment details and status
            await handlePaymentDetails(userId); // Pass userId to the function
            await handlePaymentStatus(userId); // Pass userId to the function
            
            navigate(`/formstatus/${formId}`);
          }
        });
      };
      
      const handlePaymentDetails = async () => {
        console.log("Sending payment details to backend...");
        try {
          const response = await axios.post(`${backendip}/api/paidamount`, {
            formId,
            user: userId,
            caste: selectedCaste,
            paidAmount,
          });
          console.log("Payment details saved:", response.data);
        } catch (error) {
          console.error("Error saving payment details:", error);
        }
      };
      
      const handlePaymentStatus = async (userId) => {
        console.log("Updating payment status...");
        try {
          const response = await axios.post(`${backendip}/api/status/formstatus`, {
            formId,
            userId,
            status: "Payment Done",
            paidAmount,
          });
          console.log("Payment status updated:", response.data);
        } catch (error) {
          console.error("Error updating payment status:", error);
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
