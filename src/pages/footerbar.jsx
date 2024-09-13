import React from 'react';
import { useNavigate } from 'react-router-dom';
import './footerbar.css'; // Adjust the import according to your file structure

export default function FooterBar() {
    const navigate = useNavigate();

    return (
        <div className="footer">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <button
                            type="button"
                            className="btn btn-primary m-2"
                            onClick={() => navigate('/')}
                        >
                            Home
                        </button>
                    </div>
                    <div className="col-auto">
                        <button
                            type="button"
                            className="btn btn-secondary m-2"
                            onClick={() => navigate('/about')}
                        >
                            About
                        </button>
                    </div>
                    <div className="col-auto">
                        <button
                            type="button"
                            className="btn btn-success m-2"
                            onClick={() => navigate('/contact')}
                        >
                            Contact
                        </button>
                    </div>
                    <div className="col-auto">
                        <button
                            type="button"
                            className="btn btn-primary m-2"
                            onClick={() => navigate('/cancelation')}
                        >
                            Cancelation
                        </button>
                    </div>
                    <div className="col-auto">
                        <button
                            type="button"
                            className="btn btn-secondary m-2"
                            onClick={() => navigate('/privacy')}
                        >
                            Privacy Policy
                        </button>
                    </div>
                    <div className="col-auto">
                        <button
                            type="button"
                            className="btn btn-success m-2"
                            onClick={() => navigate('/refund')}
                        >
                            Refund Policy
                        </button>
                    </div>
                    <div className="col-auto">
                        <button
                            type="button"
                            className="btn btn-primary m-2"
                            onClick={() => navigate('/terms')}
                        >
                            Terms And Conditions
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
