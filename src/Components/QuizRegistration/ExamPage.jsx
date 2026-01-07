/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as faceapi from 'face-api.js';

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

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const localStream = useRef(null);
  const lastFaceCountRef = useRef(1);

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
        setProctorMessage("🚫 Camera access REQUIRED for exam!");
        incrementWarning("Camera access denied");
      }
    };
    startVideo();
    return () => {
      if (localStream.current) localStream.current.getTracks().forEach(t => t.stop());
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    const handleVisibility = () => document.hidden && incrementWarning("Tab switching not allowed!");
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
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
      const frameArea = displaySize.width * displaySize.height * 0.15;
      
      if (box.width * box.height < frameArea) {
        violation = "Face too small! Center in frame.";
      } else {
        const landmarks = resizedDetections[0].unshiftedLandmarks.positions;
        const noseTip = landmarks[30];
        const centerX = displaySize.width / 2;
        
        if (Math.abs(noseTip.x - centerX) > displaySize.width * 0.25) {
          violation = "Looking away! Face camera directly.";
        }
      }
    }

    if (violation && lastFaceCountRef.current !== faceCount) {
      incrementWarning(violation);
      lastFaceCountRef.current = faceCount;
    }

    setFaceStatus(violation || "✅ OK");
    animationRef.current = requestAnimationFrame(detectFaces);
  }, [modelsLoaded]);

  useEffect(() => {
    if (modelsLoaded) detectFaces();
  }, [modelsLoaded]);

  const incrementWarning = (reason) => {
    setWarnings(prev => {
      const count = prev + 1;
      setProctorMessage(`⚠️ WARNING ${count}/4: ${reason}`);
      setTimeout(() => setProctorMessage(""), 5000);
      
      if (count >= 4) {
        setTimeout(() => {
          localStorage.setItem('exam_progress', JSON.stringify(answers));
          alert("🚨 EXAM TERMINATED: 4+ violations detected!");
          window.location.href = '/quiz';
        }, 1000);
      }
      return count;
    });
  };

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

  if (loading) return <div style={centerStyle}>Loading Exam Questions...</div>;
  const currentQuestion = questions[currentIdx];

  return (
    <div style={{...containerStyle,fontFamily:constants.fontFamily}}>
      {showConfirm && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <h2 style={{color: '#E30613', margin: '0 0 15px'}}>End Exam?</h2>
            <p style={{margin: 0}}>Progress will be saved automatically.</p>
            <div style={{display: 'flex', gap: 15, justifyContent: 'center', marginTop: 25}}>
              <button style={cancelBtn} onClick={() => setShowConfirm(false)}>Continue</button>
              <button style={confirmBtn} onClick={() => window.location.href = '/quiz'}>End Exam</button>
            </div>
          </div>
        </div>
      )}

      <nav style={navStyle}>
        <div style={navLeft}>
          <div style={logoStyle}><img src='/assetss/kelloggH1.png' alt="Kellogg's" style={logoImageStyle}/></div>
          <div style={timerBox}>
            <span style={timerLabel}>Time Left:</span>
            <span style={timerValue}>{formatTime(timeLeft)}</span>
          </div>
        </div>
      </nav>

      <div style={subHeader}>
        <span style={warningText}>
          Warnings: {warnings}/4 | 
          <span style={{color: faceStatus.includes('OK') ? '#4CAF50' : '#f44336', fontWeight: 'bold'}}>
            {faceStatus}
          </span>
        </span>
        {proctorMessage && <span style={toastStyle}>{proctorMessage}</span>}
        <button style={endExamBtn} onClick={() => setShowConfirm(true)}>End Exam</button>
      </div>

      <div style={mainLayout}>
        <aside style={leftPanel}>
          <h3 style={panelTitle}>Questions ({questions.length})</h3>
          <div style={gridContainer}>
            {questions.map((q, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentIdx(idx)}
                style={{
                  ...gridItem,
                  backgroundColor: currentIdx === idx ? '#FF9800' : 
                    answers[q.id] ? '#4CAF50' : '#E0E0E0',
                  color: answers[q.id] || currentIdx === idx ? '#fff' : '#666'
                }}
              >
                {idx + 1}
              </div>
            ))}
          </div>
        </aside>

        <main style={centerPanel}>
          <div style={questionHeader}>
            Q{currentIdx + 1} / {questions.length}
          </div>
          <div style={questionCard}>
            {currentQuestion ? (
              <>
                <h2 style={questionTitle}>{currentQuestion.question}</h2>
                <div style={optionsGrid}>
                  {currentQuestion.options.map((opt, i) => (
                    <div
                      key={i}
                      onClick={() => setAnswers(prev => ({...prev, [currentQuestion.id]: opt}))}
                      style={{
                        ...optionBox,
                        border: answers[currentQuestion.id] === opt ? '3px solid #2196F3' : '2px solid #FF9800',
                        backgroundColor: answers[currentQuestion.id] === opt ? '#E3F2FD' : '#fff'
                      }}
                    >
                      <input type="radio" checked={answers[currentQuestion.id] === opt} readOnly />
                      <span style={{marginLeft: 12}}>{opt}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : <div>No questions loaded</div>}
            <div style={actionButtons}>
              <button disabled={currentIdx === 0} style={prevBtn} onClick={() => setCurrentIdx(c => c - 1)}>
                Previous
              </button>
              <button style={nextBtn} onClick={() => setCurrentIdx(c => Math.min(questions.length - 1, c + 1))}>
                {currentIdx === questions.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        </main>

        <aside style={rightPanel}>
          <h3 style={panelTitle}>Live Proctoring</h3>
          <div style={webcamContainer}>
            <video ref={videoRef} autoPlay playsInline muted style={videoStyle} />
            <canvas
              ref={canvasRef}
              style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                pointerEvents: 'none'
              }}
            />
          </div>
          <div style={monitorInfo}>
            <p style={{color: warnings < 4 ? '#4CAF50' : '#f44336', margin: '0 0 8px'}}>
              📹 Camera: {modelsLoaded ? 'Active' : 'Loading'}
            </p>
            <p style={{color: faceStatus.includes('OK') ? '#4CAF50' : '#FF9800', margin: 0}}>
              👤 {faceStatus}
            </p>
            <p style={{fontSize: 11, color: '#666', marginTop: 12}}>4 warnings = Exam ends</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

const containerStyle = { backgroundColor: '#F5F7FA', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' };
const modalOverlay = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 };
const modalContent = { background: 'white', padding: '40px', borderRadius: '16px', maxWidth: '450px', textAlign: 'center' };
const cancelBtn = { padding: '12px 24px', border: '1px solid #ddd', borderRadius: '8px', background: 'white', cursor: 'pointer' };
const confirmBtn = { padding: '12px 24px', background: '#E30613', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 };
const navStyle = { background: '#E30613', padding: '20px 40px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const navLeft = { display: 'flex', alignItems: 'center', gap: '40px' };
const logoStyle = { fontSize: '28px', fontWeight: 'bold', fontStyle: 'italic' };
const timerBox = { textAlign: 'center' };
const timerLabel = { fontSize: '12px', opacity: 0.9 };
const timerValue = { fontSize: '32px', fontWeight: 'bold' };
const subHeader = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 40px', background: 'white', position: 'relative' };
const warningText = { color: '#E30613', fontWeight: 'bold', fontSize: '14px' };
const toastStyle = { position: 'absolute', left: '50%', top: '100%', transform: 'translate(-50%, -5px)', background: '#E30613', color: 'white', padding: '10px 20px', borderRadius: '25px', whiteSpace: 'nowrap' };
const endExamBtn = { padding: '10px 20px', borderRadius: '6px', border: '1px solid #ddd', background: 'white', cursor: 'pointer' };
const mainLayout = { display: 'grid', gridTemplateColumns: '220px 1fr 300px', gap: '25px', padding: '30px 40px', maxWidth: '1600px', margin: '0 auto' };
const leftPanel = { background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' };
const panelTitle = { margin: '0 0 20px 0', fontSize: '18px', color: '#333' };
const gridContainer = { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' };
const gridItem = { height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontWeight: 'bold' };
const centerPanel = { display: 'flex', flexDirection: 'column', gap: '20px' };
const questionHeader = { background: '#E30613', color: 'white', padding: '15px 25px', borderRadius: '12px 12px 0 0', fontSize: '18px' };
const questionCard = { background: 'white', padding: '40px', borderRadius: '0 0 12px 12px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' };
const questionTitle = { fontSize: '20px', margin: '0 0 30px 0', lineHeight: 1.4 };
const optionsGrid = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '40px' };
const optionBox = { padding: '20px', borderRadius: '10px', display: 'flex', alignItems: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' };
const actionButtons = { display: 'flex', justifyContent: 'space-between' };
const prevBtn = { padding: '12px 24px', border: '1px solid #ddd', borderRadius: '8px', background: '#f5f5f5', cursor: 'pointer' };
const nextBtn = { padding: '12px 24px', background: '#E30613', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' };
const rightPanel = { background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' };
const webcamContainer = { position: 'relative', width: '100%', height: '220px', background: '#000', borderRadius: '12px', overflow: 'hidden' };
const videoStyle = { width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' };
const monitorInfo = { fontSize: '13px', lineHeight: 1.5 };
const centerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontSize: '18px', color: '#666' };

export default ExamPage;
