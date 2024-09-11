import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faCheckCircle, faFileUpload } from '@fortawesome/free-solid-svg-icons';
import './DocsUpload.css';
import { getUserIdFromToken } from '../utils/auth';
import {backendip} from '../utils/const'

const DocsUpload = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const userId = getUserIdFromToken(); // Get userId from token

    const [requiredDocs, setRequiredDocs] = useState([]);
    const [uploadedDocs, setUploadedDocs] = useState({});
    const [selectedFiles, setSelectedFiles] = useState({});
    const [uploadProgress, setUploadProgress] = useState({});

    useEffect(() => {
        // Fetch required documents
        axios.get(backendip + `/api/docs/docsrequired/${id}`)
            .then(response => {
                setRequiredDocs(response.data);
            })
            .catch(error => console.error('Error fetching required documents:', error));
    }, [id]);

    useEffect(() => {
        if (userId) {
            // Fetch uploaded documents
            axios.get(backendip + `/api/docs/uploadedDocs/${id}/${userId}`)
                .then(response => {
                    setUploadedDocs(response.data);
                })
                .catch(error => console.error('Error fetching uploaded documents:', error));

            // Fetch form status
            const fetchFormStatus = async () => {
                try {
                    const paymentResponse = await axios.get(backendip + `/api/status/formstatus/${id}/${userId}`);
                    if (paymentResponse.data.status === "Document Uploaded") {
                        navigate(`/formstatus/${id}`);
                    }
                } catch (error) {
                    console.error('Error fetching form status:', error);
                }
            };

            fetchFormStatus();
        }
    }, [id, userId, navigate]);

    const handleFileChange = (e, doc) => {
        setSelectedFiles(prevState => ({
            ...prevState,
            [doc]: e.target.files[0],
        }));
    };

    const handleUpload = async (doc) => {
        const formData = new FormData();
        formData.append('file', selectedFiles[doc]);
        formData.append('doc', doc);
        formData.append('formId', id);
        formData.append('userId', userId);

        try {
            const response = await axios.post(backendip + '/upload', formData, {
                onUploadProgress: progressEvent => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(prevState => ({
                        ...prevState,
                        [doc]: percentCompleted,
                    }));
                }
            });

            if (response.status === 200) {
                console.log(`Document ${doc} uploaded successfully`);
                setUploadedDocs(prevState => ({
                    ...prevState,
                    [doc]: true,
                }));
                setSelectedFiles(prevState => ({
                    ...prevState,
                    [doc]: null,
                }));

                // Check if all required documents are uploaded and redirect
                const allUploaded = requiredDocs.every(doc => uploadedDocs[doc] || response.data[doc]);
                if (allUploaded) {
                    navigate(`/formstatus/${id}`);
                }
            } else {
                console.error(`Failed to upload document ${doc}`);
            }
        } catch (error) {
            console.error(`Error uploading document ${doc}:`, error);
        } finally {
            setUploadProgress(prevState => ({
                ...prevState,
                [doc]: null,
            }));
        }
    };

    const handleRemove = async (doc) => {
        try {
            await axios.delete(backendip + `/uploadedDocs/${id}/${userId}/${doc}`);
            const updatedDocs = await axios.get(backendip + `/uploadedDocs/${id}/${userId}`);
            setUploadedDocs(updatedDocs.data);
        } catch (error) {
            console.error(`Error removing document ${doc}:`, error);
        }
    };

    const handleSubmit = async () => {
        const allUploaded = requiredDocs.every(doc => uploadedDocs[doc]);

        if (allUploaded) {
            try {
                await axios.post(backendip + '/api/status/formstatus', {
                    formId: id,
                    userId,
                    status: 'Document Uploaded'
                });
                alert('Form submission successful!');
                navigate(`/formstatus/${id}`);
            } catch (error) {
                console.error('Error updating form status:', error);
            }
        } else {
            alert('Please upload all required documents.');
        }
    };

    return (
        <div className="docs-upload-container">
            <h1 className="upload-header">Upload Documents</h1>
            <div className="docs-list">
                {requiredDocs.map((doc, index) => (
                    <div key={index} className="doc-card">
                        <div className="doc-header">
                            <h3>{doc}</h3>
                            {uploadedDocs[doc] && !selectedFiles[doc] && !uploadProgress[doc] && (
                                <span className="tick-mark">
                                    <FontAwesomeIcon icon={faCheckCircle} />
                                </span>
                            )}
                        </div>
                        <label className="custom-file-upload">
                            <input type="file" onChange={(e) => handleFileChange(e, doc)} />
                            <FontAwesomeIcon icon={faFileUpload} className="icon" /> Choose File
                        </label>
                        <p className="doc-status">
                            Status: <span className={uploadedDocs[doc] ? 'status-uploaded' : 'status-not-uploaded'}>
                                {uploadedDocs[doc] ? 'Uploaded' : 'Not Uploaded'}
                            </span>
                        </p>
                        {uploadProgress[doc] && (
                            <div className="progress-bar">
                                <div
                                    className="progress"
                                    style={{ width: `${uploadProgress[doc]}%` }}
                                >
                                    {uploadProgress[doc]}%
                                </div>
                            </div>
                        )}
                        {selectedFiles[doc] && (
                            <div>
                                <button className="upload-button" onClick={() => handleUpload(doc)}>
                                    <FontAwesomeIcon icon={faUpload} /> Upload
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <button className="submit-button" onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
};

export default DocsUpload;
