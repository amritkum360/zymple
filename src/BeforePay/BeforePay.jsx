import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { load } from '@cashfreepayments/cashfree-js';
import './BeforePay.css';
import { backendip } from '../utils/const';

let cashfree; // Initialize Cashfree variable

// Initialize Cashfree SDK
const initializeSDK = async () => {
  cashfree = await load({
    mode: 'production' // Use 'production' for live transactions
  });
};

const BeforePay = () => {
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
    // Initialize Cashfree SDK on component mount
    initializeSDK();

    const fetchFormData = async () => {
      try {
        const response = await axios.get(`${backendip}/api/forms/forms/${id}`);
        setFormData(response.data);
        setFormId(response.data._id); // Set formId after data is fetched
        console.log('Form Data:', response.data);
        const userId = getUserIdFromToken();
        setUserId(userId)

        if (userId) {
          const paymentResponse = await axios.get(`${backendip}/api/status/formstatus/${id}/${userId}`);
          if (paymentResponse.data.status === "Payment Done") {
            navigate(`/docs/${id}`);
          } else {
            navigate(`/formstatus/${id}`);
          }
        }
      } catch (error) {
        console.error('Error fetching form data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFormData();
  }, [id, navigate]);

  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      return decoded.userId;
    }
    return null;
  };

  const handleCasteSelect = (caste, amount) => {
    setSelectedCaste(caste);
    setPaidAmount(amount);
  };

  const handlePayNow = async () => {
    const userId = getUserIdFromToken();

    if (!userId || !selectedCaste || !paidAmount || !formId) {
      console.error('Required information missing');
      return;
    }

    try {
      // Create an order on the backend
      const orderResponse = await axios.post(`${backendip}/create-order`, {
        orderId: Date.now().toString(),
        customerPhone: '9999999999', // Replace with actual customer phone
        customerId: userId, // Replace with actual customer ID
        amount: paidAmount, // Amount should be in your preferred format
      });

      if (orderResponse.data && orderResponse.data.payment_session_id) {
        const sessionId = orderResponse.data.payment_session_id; // Get session ID from response
        const orderId =orderResponse.data.order_id
        doPayment(sessionId, orderId); // Proceed to payment
      } else {
        console.error('Failed to create order:', orderResponse.statusText);
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };

  const doPayment = async (sessionid, orderId) => {
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
        cashfreepaymentStatus(orderId)
        // console.log('cashfreestatus', cashfreestatus)
        // Call separate functions for handling payment details and status
        // await handlePaymentDetails(userId); // Pass userId to the function
        // await handlePaymentStatus(userId); // Pass userId to the function
        
        // navigate(`/docs/${formId}`);
      }
    });
  };

  const cashfreepaymentStatus = async (orderId) => {
    try {
      const res = await fetch(`${backendip}/paymentstatus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
        }),
      });
  
      if (!res.ok) {
        throw new Error('Failed to fetch payment status');
      }
  
      // The response is now JSON
      const data = await res.json();
  
      console.log('Payment Status:', data);
  
      if (data.status === 'Success') {
        console.log('Payment successful');
        await handlePaymentDetails(userId); // Pass userId to the function
        await handlePaymentStatus(userId); // Pass userId to the function
        
        navigate(`/docs/${formId}`);
      } else if (data.status === 'Pending') {
        console.log('Payment is pending');
      } else {
        console.log('Payment failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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

  const pricingDetails = formData.pricingDetails || { caste: [], charge: [] };

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

export default BeforePay;
