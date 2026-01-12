/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as faceapi from 'face-api.js';
import './ExamPage.css'
const ExamPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(2722);
  const [warnings, setWarnings] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [proctorMessage, setProctorMessage] = useState("");

  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [faceStatus, setFaceStatus] = useState("Initializing...");
  const [currentViolation, setCurrentViolation] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const localStream = useRef(null);
  const warningTimeoutRef = useRef(null);
  const currentViolationRef = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.ssdMobilenetv1.loadFromUri('/Models');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/Models');
        setModelsLoaded(true);
        setFaceStatus("Starting detection...");
        console.log('✅ FaceAPI models loaded');
      } catch (err) {
        console.error('❌ FaceAPI models failed:', err);
        setFaceStatus("Models failed - Check /public/Models/");
      }
    };
    loadModels();
  }, []);

  useEffect(() => {
    const startVideo = async () => {
      try {
        localStream.current = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480, facingMode: 'user' },
          audio: false
        });
        if (videoRef.current) {
          videoRef.current.srcObject = localStream.current;
          videoRef.current.onloadedmetadata = () => videoRef.current.play();
        }
      } catch (err) {
        console.error('❌ Camera denied:', err);
        handleViolation("Camera access denied");
      }
    };
    startVideo();
    return () => {
      if (localStream.current) localStream.current.getTracks().forEach(t => t.stop());
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current);
        warningTimeoutRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) handleViolation("Tab switching not allowed!");
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const handleViolation = useCallback((violationText) => {
    console.log('🔄 New violation:', violationText);

    // Clear existing timeout
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
      warningTimeoutRef.current = null;
    }

    currentViolationRef.current = violationText;
    setCurrentViolation(violationText);
    setProctorMessage(`⚠️ Warning Active: ${violationText}`);
    setFaceStatus(violationText);

    warningTimeoutRef.current = setTimeout(() => {
      console.log('⏰ 5 seconds passed - incrementing warning count');

      setWarnings(prevWarnings => {
        const newCount = prevWarnings + 1;
        console.log(`⚠️ Warning count increased to: ${newCount}/4`);

        setProctorMessage(`⚠️ WARNING ${newCount}/4: ${violationText}`);

        // Clear violation after counting
        setCurrentViolation(null);
        currentViolationRef.current = null;

        // TERMINATE if 4 warnings reached
        if (newCount >= 4) {
          console.log('🚨 TERMINATING EXAM - 4 warnings reached');
          setTimeout(() => {
            localStorage.setItem('exam_progress', JSON.stringify(answers));
            alert("🚨 EXAM TERMINATED: 4+ violations detected!");
            window.location.href = '/thank-you';
          }, 1000);
        }

        return newCount;
      });

      warningTimeoutRef.current = null;
    }, 5000);
  }, [answers]);

  const clearViolation = useCallback(() => {
    console.log('✅ Clearing violation');
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
      warningTimeoutRef.current = null;
    }
    currentViolationRef.current = null;
    setCurrentViolation(null);
    setProctorMessage("");
    setFaceStatus("✅ OK");
  }, []);

  const detectFaces = useCallback(async () => {
    if (!modelsLoaded || !videoRef.current?.videoWidth || !canvasRef.current) {
      animationRef.current = requestAnimationFrame(detectFaces);
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const displaySize = { width: video.videoWidth, height: video.videoHeight };

    faceapi.matchDimensions(canvas, displaySize);

    const detections = await faceapi
      .detectAllFaces(video, new faceapi.SsdMobilenetv1Options({ minConfidence: 0.6 }))
      .withFaceLandmarks();

    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    faceapi.draw.drawDetections(canvas, resizedDetections);
    resizedDetections.forEach(d => faceapi.draw.drawFaceLandmarks(canvas, d));

    const faceCount = resizedDetections.length;
    let violation = null;

    if (faceCount === 0) {
      violation = "No face! Show your face to camera.";
    } else if (faceCount > 1) {
      violation = `${faceCount} faces detected! Only 1 allowed.`;
    } else {
      const box = resizedDetections[0].detection.box;
      const frameArea = displaySize.width * displaySize.height * 0.03;

      if (box.width * box.height < frameArea) {
        violation = "Face too small! Center in frame.";
      } else {
        const landmarks = resizedDetections[0].unshiftedLandmarks.positions;
        const noseTip = landmarks[30];
        const centerX = displaySize.width / 2;

        if (Math.abs(noseTip.x - centerX) > displaySize.width * 0.40) {
          violation = "Looking away! Face camera directly.";
        }
      }
    }

    if (violation) {
      if (currentViolationRef.current !== violation) {
        handleViolation(violation);
      }
    } else if (currentViolationRef.current) {
      clearViolation();
    }

    animationRef.current = requestAnimationFrame(detectFaces);
  }, [modelsLoaded, handleViolation, clearViolation]);

  useEffect(() => {
    if (modelsLoaded) {
      detectFaces();
    }
  }, [modelsLoaded, detectFaces]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_STRAPI_URL}/api/exam-questions`)
      .then(res => res.json())
      .then(data => {
        if (data.data?.[0]?.questions) setQuestions(data.data[0].questions);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    const endTime = Date.now() + timeLeft * 1000;
    const interval = setInterval(() => {
      setTimeLeft(Math.max(0, Math.round((endTime - Date.now()) / 1000)));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (loading) return <div className='centerStyle'>Loading Exam Questions...</div>;
  const currentQuestion = questions[currentIdx];

  return (
    <div className='containerStyle'>
      {showConfirm && (
        <div className='modalOverlay'>
          <div className='modalContent'>
            <h2 style={{ color: constants.red, margin: '0 0 15px' }}>End Exam?</h2>
            <p style={{ margin: 0 }}>Progress will be saved automatically.</p>
            <div style={{ display: 'flex', gap: 15, justifyContent: 'center', marginTop: 25 }}>
              <button className='cancelBtn' onClick={() => setShowConfirm(false)}>Continue</button>
              <button className='confirmBtn' onClick={() => window.location.href = '/thank-you'}>End Exam</button>
            </div>
          </div>
        </div>
      )}

      <nav className='navStyle'>
        <div className='navLeft'>
          <div className='logoStyle'>Kellogg's</div>
          <div className='timerBox'>
            <span className='timerLabel'>Time Left:</span>
            <span className='timerValue'>{formatTime(timeLeft)}</span>
          </div>
        </div>
      </nav>

      <div className='subHeader'>
        <span className='warningText'>
          Warnings: {warnings}/4 |
          <span style={{
            color: faceStatus.includes('OK') ? '#4CAF50' :
              currentViolation ? constants.red : constants.gold,
            fontWeight: 'bold'
          }}>
            {faceStatus}
          </span>
        </span>
        {proctorMessage && <span className='toastStyle'>{proctorMessage}</span>}
        <button className='endExamBtn' onClick={() => setShowConfirm(true)}>End Exam</button>
      </div>

      <div className='mainLayout'>
        <aside className='leftPanel'>
          <h3 className='panelTitle'>Questions ({questions.length})</h3>
          <div className='gridContainer'>
            {questions.map((q, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentIdx(idx)}
                className='gridItem'
                style={{
                  backgroundColor: currentIdx === idx ? constants.gold :
                    answers[q.id] ? '#4CAF50' : '#E0E0E0',
                  color: answers[q.id] || currentIdx === idx ? '#fff' : '#666'
                }}
              >
                {idx + 1}
              </div>
            ))}
          </div>
        </aside>

        <main className='centerPanel'>
          <div className='questionHeader'>
            Q{currentIdx + 1} / {questions.length}
          </div>
          <div className='questionCard'>
            {currentQuestion ? (
              <>
                <h2 className='questionTitle'>{currentQuestion.question}</h2>
                <div className='optionsGrid'>
                  {currentQuestion.options.map((opt, i) => (
                    <div
                      key={i}
                      onClick={() => setAnswers(prev => ({ ...prev, [currentQuestion.id]: opt }))}
                      className='optionBox'
                      style={{
                        border: answers[currentQuestion.id] === opt ? '3px solid #2196F3' : `2px solid ${constants.gold}`,
                        backgroundColor: answers[currentQuestion.id] === opt ? '#E3F2FD' : '#fff'
                      }}
                    >
                      <input type="radio" checked={answers[currentQuestion.id] === opt} readOnly />
                      <span style={{ marginLeft: 12 }}>{opt}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : <div>No questions loaded</div>}
            <div className='actionButtons'>
              <button disabled={currentIdx === 0} className='prevBtn' onClick={() => setCurrentIdx(c => c - 1)}>
                Previous
              </button>
              <button className='nextBtn' onClick={() => setCurrentIdx(c => Math.min(questions.length - 1, c + 1))}>
                {currentIdx === questions.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        </main>

        <aside className='rightPanel'>
          <h3 className='panelTitle'>Live Proctoring</h3>
          <div className='webcamContainer'>
            <video ref={videoRef} autoPlay playsInline muted className='videoStyle' />
            <canvas
              ref={canvasRef}
              style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                pointerEvents: 'none'
              }}
            />
          </div>
          <div className='monitorInfo'>
            <p style={{ color: warnings < 4 ? '#4CAF50' : constants.red, margin: '0 0 8px' }}>
              📹 Camera: {modelsLoaded ? 'Active' : 'Loading'}
            </p>
            <p style={{
              color: faceStatus.includes('OK') ? '#4CAF50' :
                currentViolation ? constants.red : constants.gold,
              margin: 0
            }}>
              👤 {faceStatus}
            </p>
            <p style={{ fontSize: 11, color: '#666', marginTop: 12 }}>4 warnings = Exam ends</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

// Styles remain exactly the same
const constants = { gold: '#FBCA05', red: '#F60945', fontFamily: '"KelloggsSans", Arial, sans-serif' }

export default ExamPage;
