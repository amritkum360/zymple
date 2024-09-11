import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BeforePay.css';
import {backendip, razorpayip} from '../utils/const'

const BeforePay = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [selectedCaste, setSelectedCaste] = useState(null);
  const [paidAmount, setPaidAmount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState(false);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(backendip + `/api/forms/forms/${id}`);
        setFormData(response.data);

        const userId = getUserIdFromToken();
        if (userId) {
            const paymentResponse = await axios.get(backendip + `/api/status/formstatus/${id}/${userId}`);
            console.log(paymentResponse)

            if (paymentResponse.data.status === "Payment Done") {
            //setPaymentStatus(true);
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

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Define the handleCasteSelect function
  const handleCasteSelect = (caste, amount) => {
    setSelectedCaste(caste);
    setPaidAmount(amount);
  };

  const handlePayNow = async () => {
    const formId = formData._id;
    const userId = getUserIdFromToken();

    if (!userId || !selectedCaste || !paidAmount) {
      console.log(userId, selectedCaste, paidAmount)
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
      const orderResponse = await axios.post(razorpayip + '/order', {
        amount: paidAmount * 100, // Amount in paise
        currency: 'INR',
        receipt: `receipt_${formId}_${userId}`,
      });

      const order = orderResponse.data;

      const options = {
        key: 'rzp_test_2NeEZJpOj1mDAk', // Replace with your Razorpay key ID
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
            await axios.post(razorpayip + '/order/validate', paymentData);
            // On successful payment validation, save the payment details
            await axios.post(backendip + '/api/paidamount', {
              formId,
              user: userId,
              caste: selectedCaste,
              paidAmount,
            });

              await axios.post(backendip + '/api/status/formstatus', {
              formId,
               userId,
                status: "Payment Done",
              paidAmount,
            });

            navigate(`/docs/${formId}`);
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
