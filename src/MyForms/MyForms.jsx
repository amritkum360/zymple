import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyForms.css'; 
import { getUserIdFromToken } from '../utils/auth'; 
import axios from 'axios';
//import { getUserIdFromToken } from '../utils/auth';
import {backendip} from '../utils/const'

export default function MyForms() {
    const [data, setData] = useState([]);
    const [uploadedDocs, setUploadedDocs] = useState({});

    const navigate = useNavigate();
    const userId = getUserIdFromToken();


  useEffect(() => {
    const fetchUserForms = async () => {
      const userid = getUserIdFromToken(); 
      
      try {
        const response = await fetch(backendip + '/myorders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userid }), 
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const formattedData = data.map(item => ({
          id: item._id, // Use item._id as the ID
          image: item.thumbnail || '/default-image.jpg', // Default image path if thumbnail is empty
          title: item.formname || 'No title available', // Add a fallback for the title
          description: item.description || 'No description available',
          prices: item.pricing && Array.isArray(item.pricing) 
            ? item.pricing.map((price, index) => ({
                caste: price.caste || 'No caste available',
                charge: price.charge || 'No charge available'
              }))
            : [{ caste: 'No caste available', charge: 'No charge available' }], // Handle undefined or incorrect structure
          tags: Array.isArray(item.tags) ? item.tags : [], // Ensure tags is an array
          requireddocs: Array.isArray(item.requireddocs) ? item.requireddocs : [], // Ensure requireddocs is an array
        }));
        setData(formattedData);
        console.log(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserForms();
  }, []);

    const handleCardClick = async (formData) => {
        if (!userId) {
            navigate(`/b/${formData.id}`, { state: formData });
            return;
        }

        try {
            let isPaymentDone = false;

            try {
                // Fetch the payment status
                const paymentResponse = await axios.get(backendip + `/api/paidamount?formId=${formData.id}&user=${userId}`);
                isPaymentDone = paymentResponse.data.length > 0;
                console.log("Payment Response:", paymentResponse.data);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    // Payment not found, handle accordingly
                    console.log("Payment not completed.");
                    navigate(`/b/${formData.id}`);
                    return;
                }
                throw error; // Re-throw if not 404
            }

            // Fetch the uploaded documents
            const uploadedDocsResponse = await axios.get(backendip + `/api/docs/uploadedDocs/${formData.id}/${userId}`);
            setUploadedDocs(uploadedDocsResponse.data);
            console.log("Uploaded Docs Response:", uploadedDocsResponse.data);

            // Check if all required documents are uploaded
            const requiredDocs = formData.requireddocs || [];
            const allUploaded = requiredDocs.every(doc => uploadedDocsResponse.data[doc]);
            console.log("All Uploaded:", allUploaded);

            if (isPaymentDone && allUploaded) {
                navigate(`/formstatus/${formData.id}`);
            } else if (isPaymentDone) {
                navigate(`/docs/${formData.id}`);
            } else {
                // Handle cases where payment is done but documents are not all uploaded (if necessary)
                console.log("Some required documents are missing.");
            }
        } catch (error) {
            console.error('Error handling card click:', error);
        }
    };


  return (
      <>
          <h1>My Forms</h1>
    <div className="myforms-container">
      {data.map(item => (
        <div key={item.id} className="myforms-card" onClick={() => handleCardClick(item)}>
          <img src={item.image} alt={item.title} className="myforms-card-image" />
          <div className="myforms-card-content">
            <h2 className="myforms-card-title">{item.title}</h2>
            <div className="myforms-card-tags">
              {item.tags.map((tag, index) => (
                <span key={index} className="myforms-card-tag">{tag}</span>
              ))}
            </div>
            <div className="myforms-card-docs">
              {item.requireddocs.map((doc, index) => (
                <span key={index} className="myforms-card-doc">{doc}</span>
              ))}
            </div>
            <p className="myforms-card-description">{item.description}</p>
            {/* <div className="myforms-card-pricing">
              {item.prices.map((pricing, index) => (
                <p key={index}>{pricing.caste}: {pricing.charge}</p>
              ))}
            </div> */}
          </div>
        </div>
      ))}
          </div>
    </>
  );
}
