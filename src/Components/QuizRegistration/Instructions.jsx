import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as faceapi from 'face-api.js';
import './Instructions.css';
import RedButton from '../RedButton';

const Instructions = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [cameraAllowed, setCameraAllowed] = useState(false);
    const [error, setError] = useState(null);
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [faceStatus, setFaceStatus] = useState("Initializing models...");
    const [isFaceValid, setIsFaceValid] = useState(false);
    const [audioLevel, setAudioLevel] = useState(0);
    const navigate = useNavigate();

    const animationRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const sourceRef = useRef(null);

    useEffect(() => {
        const loadModels = async () => {
            try {
                // Assuming models are in /public/Models like ExamPage
                await faceapi.nets.ssdMobilenetv1.loadFromUri('/Models');
                await faceapi.nets.faceLandmark68Net.loadFromUri('/Models');
                setModelsLoaded(true);
                setFaceStatus("Waiting for camera...");
            } catch (err) {
                console.error("Failed to load models:", err);
                setFaceStatus("Error loading AI models");
            }
        };
        loadModels();
    }, []);

    useEffect(() => {
        const startMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { width: 640, height: 480, facingMode: 'user' },
                    audio: true
                });

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setCameraAllowed(true);
                }

                const AudioContext = window.AudioContext || window.webkitAudioContext;
                const audioCtx = new AudioContext();
                const analyser = audioCtx.createAnalyser();
                const source = audioCtx.createMediaStreamSource(stream);

                source.connect(analyser);
                analyser.fftSize = 256;
                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);

                audioContextRef.current = audioCtx;
                analyserRef.current = analyser;
                sourceRef.current = source;

                const updateAudioLevel = () => {
                    if (!analyserRef.current) return;
                    analyserRef.current.getByteFrequencyData(dataArray);
                    let sum = 0;
                    for (let i = 0; i < bufferLength; i++) {
                        sum += dataArray[i];
                    }
                    const average = sum / bufferLength;
                    setAudioLevel(Math.min(100, average * 2));
                    requestAnimationFrame(updateAudioLevel);
                };
                updateAudioLevel();

            } catch (err) {
                console.error("Error accessing media:", err);
                setError("Camera/Microphone access required.");
                setCameraAllowed(false);
            }
        };

        if (modelsLoaded) {
            startMedia();
        }

        return () => {
            // Cleanup
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(t => t.stop());
            }
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [modelsLoaded]);

    const detectFaces = useCallback(async () => {
        if (!videoRef.current || !canvasRef.current || !modelsLoaded || !cameraAllowed) {
            animationRef.current = requestAnimationFrame(detectFaces);
            return;
        }

        const video = videoRef.current;

        if (video.readyState !== 4) {
            animationRef.current = requestAnimationFrame(detectFaces);
            return;
        }

        const displaySize = { width: video.videoWidth, height: video.videoHeight };
        faceapi.matchDimensions(canvasRef.current, displaySize);

        const detections = await faceapi.detectAllFaces(video, new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 })).withFaceLandmarks();

        if (!canvasRef.current || !videoRef.current) return;

        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        resizedDetections.forEach(detection => {
            const box = detection.detection.box;
            new faceapi.draw.DrawBox(box, { label: ' ' }).draw(canvasRef.current);
        });

        if (resizedDetections.length === 0) {
            setFaceStatus("Face not detected");
            setIsFaceValid(false);
        } else if (resizedDetections.length > 1) {
            setFaceStatus("Multiple faces detected");
            setIsFaceValid(false);
        } else {
            const face = resizedDetections[0];
            const { box } = face.detection;
            const boxArea = box.width * box.height;
            const videoArea = displaySize.width * displaySize.height;

            if (boxArea < videoArea * 0.04) {
                setFaceStatus("Move closer");
                setIsFaceValid(false);
            } else {
                const centerX = box.x + box.width / 2;
                const videoCenterX = displaySize.width / 2;
                if (Math.abs(centerX - videoCenterX) > displaySize.width * 0.3) {
                    setFaceStatus("Please center your face");
                    setIsFaceValid(false);
                } else {
                    setFaceStatus("Face Visible - Ready to Start");
                    setIsFaceValid(true);
                }
            }
        }

        animationRef.current = requestAnimationFrame(detectFaces);
    }, [modelsLoaded, cameraAllowed]);

    useEffect(() => {
        if (modelsLoaded && cameraAllowed) {
            detectFaces();
        }
    }, [modelsLoaded, cameraAllowed, detectFaces]);


    const handleStartExam = () => {
        if (isFaceValid && cameraAllowed) {
            navigate('/exam-page');
        } else {
            alert("Please Ensure Camera and Audio are Working and Face is visible to start.");
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
                        <h3><span className="icon">📷</span> System Check</h3>

                        <div className="video-wrapper">
                            {error ? (
                                <div className="camera-error">{error}</div>
                            ) : (
                                <>
                                    <video ref={videoRef} autoPlay playsInline muted className="preview-video" />
                                    <canvas ref={canvasRef} className="preview-canvas" />
                                </>
                            )}
                            <div className={`overlay-status ${isFaceValid ? 'status-ok' : 'status-warn'}`}>
                                {faceStatus}
                            </div>
                        </div>

                        <div className="audio-check-container">
                            <span className="audio-label">🎤 Audio Input:</span>
                            <div className="audio-bar-bg">
                                <div
                                    className="audio-bar-fill"
                                    style={{ width: `${Math.min(audioLevel, 100)}%` }}
                                ></div>
                            </div>
                        </div>

                        <p className="camera-note">Please ensure your face is clearly visible and centred. Speak to test audio.</p>
                    </div>
                </div>

                <div className="action-section">
                    <RedButton onClick={handleStartExam}
                        buttonStyle={`${(!isFaceValid || !cameraAllowed) ? 'bg-gray-300 px-10 cursor-not-allowed' : ''}`}
                        disabled={!isFaceValid || !cameraAllowed}
                        buttonText={(isFaceValid ? "I Accept & Start Exam" : "Checking System...").toUpperCase()}
                    />
                    {!cameraAllowed && !error && <p className="loading-text">Waiting for permissions...</p>}
                </div>
            </div>
        </div>
    );
};

export default Instructions;
