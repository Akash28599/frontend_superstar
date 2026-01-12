import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Instructions.css';

const Instructions = () => {
    const videoRef = useRef(null);
    const [cameraAllowed, setCameraAllowed] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setCameraAllowed(true);
                }
            } catch (err) {
                console.error("Error accessing camera:", err);
                setError("Camera access is required. Please allow camera access to proceed.");
                setCameraAllowed(false);
            }
        };

        startCamera();

        // Cleanup function to stop the stream when component unmounts
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    const handleStartExam = () => {
        if (cameraAllowed) {
            navigate('/exam-page');
        } else {
            alert("Please allow camera access to start the exam.");
        }
    };

    return (
        <div className="instructions-container">
            <div className="instructions-card">
                <div className="header-section">
                    <h1 className="main-title">Exam Instructions</h1>
                    <p className="subtitle">Please read the following rules carefully before starting.</p>
                </div>

                <div className="content-grid">
                    <div className="rules-section">
                        <h3><span className="icon">📋</span> Rules & Regulations</h3>
                        <ul className="rules-list">
                            <li>
                                <span className="rule-number">1</span>
                                <div className="rule-text"><strong>No Tab Switching:</strong> Moving away from the exam tab will be recorded as a violation.</div>
                            </li>
                            <li>
                                <span className="rule-number">2</span>
                                <div className="rule-text"><strong>Stay in Frame:</strong> Your face must be visible in the camera at all times.</div>
                            </li>
                            <li>
                                <span className="rule-number">3</span>
                                <div className="rule-text"><strong>No Turning Back:</strong> Looking away or turning your head frequently is not allowed.</div>
                            </li>
                            <li>
                                <span className="rule-number">4</span>
                                <div className="rule-text"><strong>One Person Only:</strong> Two or more persons are not allowed to take the exam.</div>
                            </li>
                            <li>
                                <span className="rule-number">5</span>
                                <div className="rule-text"><strong>Exam Termination:</strong> If warnings exceed 4, the exam will be automatically terminated.</div>
                            </li>
                            <li>
                                <span className="rule-number">6</span>
                                <div className="rule-text"><strong>Environment:</strong> Ensure you are in a well-lit room with no other people around.</div>
                            </li>
                        </ul>
                    </div>

                    <div className="camera-section">
                        <h3><span className="icon">📷</span> Camera Preview</h3>
                        <div className="video-wrapper">
                            {error ? (
                                <div className="camera-error">{error}</div>
                            ) : (
                                <video ref={videoRef} autoPlay playsInline muted className="preview-video" />
                            )}
                            <div className="overlay-text">{cameraAllowed ? "Camera Active" : "Initializing..."}</div>
                        </div>
                        <p className="camera-note">Please ensure your face is clearly visible in the frame.</p>
                    </div>
                </div>

                <div className="action-section">
                    <button 
                        className={`start-btn ${!cameraAllowed ? 'disabled' : ''}`} 
                        onClick={handleStartExam}
                        disabled={!cameraAllowed}
                    >
                        I Accept & Start Exam
                    </button>
                    {!cameraAllowed && !error && <p className="loading-text">Waiting for camera permission...</p>}
                </div>
            </div>
        </div>
    );
};

export default Instructions;
