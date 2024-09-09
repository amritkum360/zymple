import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SimpleList.css'; // Import unique CSS file
import { getUserIdFromToken } from '../../../utils/auth';
import axios from 'axios';
import {backendip} from '../../../utils/const'

export default function SimpleList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const userId = getUserIdFromToken();
    console.log(backendip)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(backendip + ':3003/api/forms/printforms');
                const result = await response.json();
                const formattedData = result.map(item => ({
                    id: item._id,
                    image: item.thumbnail || '/mainpage/trending/aadharthumb.webp',
                    title: item.formname || 'No title available',
                    description: item.description || 'No description available',
                    prices: item.pricingDetails && Array.isArray(item.pricingDetails.caste) && Array.isArray(item.pricingDetails.charge)
                        ? item.pricingDetails.caste.map((caste, index) => ({
                            caste,
                            charge: item.pricingDetails.charge[index] || 'No charge available'
                        }))
                        : [{ caste: 'No price available', charge: 'No charge available' }],
                    tags: Array.isArray(item.tags) ? item.tags : [],
                    requireddocs: Array.isArray(item.requireddocs) ? item.requireddocs : [],
                }));
                setData(formattedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleCardClick = async (formData) => {
        if (!userId) {
            // If no userId, navigate to `/b/${formData.id}`
            navigate(`/b/${formData.id}`, { state: formData });
            return;
        }

        try {
            // Attempt to fetch the document status
            try {
                const docsResponse = await axios.get(backendip + ':3003/api/status/formstatus/${formData.id}/${userId}');
                const status = docsResponse.data.status;
                console.log("Document status:", status);

                if (status === 'Document Uploaded') {
                    navigate(`/formstatus/${formData.id}`);
                } else if (status === 'Payment Done') {
                    navigate(`/docs/${formData.id}`);
                } else {
                    // Handle unexpected status values
                    console.log("Status not recognized or incomplete.");
                    navigate(`/formstatus/${formData.id}`);
                }
            } catch (error) {
                // Check if the error is a 404
                if (error.response && error.response.status === 404) {
                    console.log("Document status not found.");
                    navigate(`/b/${formData.id}`);
                } else {
                    console.error('Error fetching document status:', error);
                }
            }
        } catch (error) {
            console.error('Error handling card click:', error);
        }
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="simple-list__container">
            {data.map(item => (
                <div key={item.id} className="simple-list__card" onClick={() => handleCardClick(item)}>
                    <img src={item.image} alt={item.title} className="simple-list__card-image" />
                    <div className="simple-list__card-content">
                        <h2 className="simple-list__card-title">{item.title}</h2>
                        {/*<div className="simple-list__card-tags">*/}
                        {/*    {item.tags.map((tag, index) => (*/}
                        {/*        <span key={index} className="simple-list__card-tag">{tag}</span>*/}
                        {/*    ))}*/}
                        {/*</div>*/}
                        {/*<div className="simple-list__card-docs">*/}
                        {/*    {item.requireddocs.map((doc, index) => (*/}
                        {/*        <span key={index} className="simple-list__card-doc">{doc}</span>*/}
                        {/*    ))}*/}
                        {/*</div>*/}
                        <p className="simple-list__card-description">{item.description}</p>
                        <div className="simple-list__card-pricing">
                            {item.prices.map((pricing, index) => (
                                <div className="simple-list1__card-pricing" key={index}>
                                    <span className="caste">{pricing.caste}</span>
                                    <span className="price">₹{pricing.charge}</span>
                                </div>
                            ))}
                        </div>


                    </div>
                </div>
            ))}
        </div>
    );
}
