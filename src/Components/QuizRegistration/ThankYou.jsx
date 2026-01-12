import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ThankYou.css';

const ThankYou = () => {
    const navigate = useNavigate();

    return (
        <div className="thank-you-container">
            <div className="thank-you-card">
                <div className="icon-circle">
                    🎉
                </div>
                <h1 className="thank-title">Thank You!</h1>
                <p className="thank-message">
                    You have successfully completed the exam.
                </p>
                <div className="divider"></div>
                <p className="info-message">
                    We have recorded your responses. We will review your session and notify you via email regarding the further process and results.
                </p>
                <button 
                    className="home-btn"
                    onClick={() => navigate('/')}
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default ThankYou;
