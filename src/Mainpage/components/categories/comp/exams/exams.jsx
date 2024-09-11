import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import './Exams.css'; // Import the CSS file for styling
import { getUserIdFromToken } from "../../../../../utils/auth"
import {backendip} from "../../../../../utils/const"


export default function Exams() {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true); // Track loading state
    const navigate = useNavigate(); // Initialize useNavigate
    const userId = getUserIdFromToken();

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await axios.get(backendip + '/cat/exams');
                setExams(response.data);
            } catch (error) {
                console.error('Error fetching exams', error);
            } finally {
                setLoading(false); // Set loading to false after fetch
            }
        };
        fetchExams();
    }, []);

    // Handler function to check exam status and navigate
    const handleExamClick = async (examId) => {
        try {
            // Fetch exam status
            const statusResponse = await axios.get(backendip + `/api/status/formstatus/${examId}/${userId}`);
            const status = statusResponse.data.status;

            // Navigate based on status
            if (status === 'Document Uploaded') {
                navigate(`/formstatus/${examId}`);
            } else if (status === 'Payment Done') {
                navigate(`/docs/${examId}`);
            } else {
                navigate(`/b/${examId}`);
            }
        } catch (error) {
            console.error('Error fetching exam status', error);
            navigate(`/b/${examId}`); // Default to exam details in case of error
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading indicator while fetching data
    }

    return (
        <>
            <h1>Apply For Exams</h1>
            <div className="exams-container">
                {exams.map((exam) => (
                    <div
                        key={exam._id}
                        className="exam-item"
                        onClick={() => handleExamClick(exam._id)} // Add onClick event
                    >
                        <img src={exam.thumbnail} alt={exam.formname} className="exam-image" />
                    </div>
                ))}
            </div>
        </>
    );
}
