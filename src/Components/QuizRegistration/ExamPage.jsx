import React, { useState, useEffect, useRef } from 'react';

const ExamPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(2722);
  const [warnings, setWarnings] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [proctorMessage, setProctorMessage] = useState("");
  const videoRef = useRef(null);

  useEffect(() => {
    let localStream = null;
    const startVideo = async () => {
      try {
        localStream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 },
          audio: false
        });
        if (videoRef.current) {
          videoRef.current.srcObject = localStream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play().catch(console.error);
          };
        }
      } catch (err) {
        console.error(err);
      }
    };
    startVideo();
    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setWarnings((prev) => {
          const newCount = prev + 1;
          setProctorMessage(`WARNING ${newCount}/3: Do not switch tabs!`);
          setTimeout(() => setProctorMessage(""), 5000);
          return newCount;
        });
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    fetch('https://strapi-superstar.onrender.com/api/exam-questions')
      .then(res => res.json())
      .then(json => {
        if (json.data?.[0]?.questions) setQuestions(json.data[0].questions);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    const endTime = Date.now() + timeLeft * 1000;
    const timer = setInterval(() => {
      const now = Date.now();
      const remaining = Math.round((endTime - now) / 1000);
      if (remaining <= 0) {
        setTimeLeft(0);
        clearInterval(timer);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (loading) return <div style={centerStyle}>Loading Exam...</div>;
  const currentQuestion = questions[currentIdx];

  return (
    <div style={containerStyle}>
      {showConfirm && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <h2 style={{ color: '#dd2120', marginTop: 0 }}>End Exam?</h2>
            <p>Are you sure you want to exit? Your progress will be saved.</p>
            <div style={{ display: 'flex', gap: '15px', marginTop: '20px', justifyContent: 'center' }}>
              <button style={cancelBtn} onClick={() => setShowConfirm(false)}>Continue</button>
              <button style={confirmBtn} onClick={() => window.location.href = '/quiz'}>End Now</button>
            </div>
          </div>
        </div>
      )}

      <nav style={navStyle}>
        <div style={navLeft}>
          <div style={logoStyle}>Kellogg's</div>
          <div style={timerBox}>
            <span style={timerLabel}>Time Remaining:</span>
            <span style={timerValue}>{formatTime(timeLeft)}</span>
          </div>
        </div>
      </nav>

      <div style={subHeader}>
        <span style={warningText}>⚠️ Warnings: {warnings} / 3</span>
        {proctorMessage && <span style={toastStyle}>{proctorMessage}</span>}
        <button style={endExamBtn} onClick={() => setShowConfirm(true)}>End Exam</button>
      </div>

      <div style={mainLayout}>
        <aside style={leftPanel}>
          <h3 style={panelTitle}>Questions</h3>
          <div style={gridContainer}>
            {questions.map((q, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentIdx(idx)}
                style={{
                  ...gridItem,
                  backgroundColor: currentIdx === idx ? '#FFCC00' : (answers[q.id] ? '#4CAF50' : '#DDD'),
                  color: (answers[q.id] || currentIdx === idx) ? '#fff' : '#666'
                }}
              >
                {idx + 1}
              </div>
            ))}
          </div>
        </aside>

        <main style={centerPanel}>
          <div style={questionHeader}>Question {currentIdx + 1}</div>
          <div style={questionCard}>
            {currentQuestion && (
              <>
                <h2 style={questionTitle}>{currentQuestion.question}</h2>
                <div style={optionsGrid}>
                  {currentQuestion.options.map((opt, i) => (
                    <div
                      key={i}
                      onClick={() => setAnswers({ ...answers, [currentQuestion.id]: opt })}
                      style={{
                        ...optionBox,
                        border: answers[currentQuestion.id] === opt ? '2px solid #2196F3' : '1px solid #FFCC00',
                        backgroundColor: answers[currentQuestion.id] === opt ? '#f0f7ff' : '#fff'
                      }}
                    >
                      <input type="radio" checked={answers[currentQuestion.id] === opt} readOnly />
                      <span style={{ marginLeft: '10px' }}>{opt}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
            <div style={actionButtons}>
              <button disabled={currentIdx === 0} onClick={() => setCurrentIdx(currentIdx - 1)} style={prevBtn}>Back</button>
              <button
                onClick={() => {
                  if (currentIdx == questions.length - 1) {
                    setShowConfirm(true)
                  }
                  else {
                    setCurrentIdx(Math.min(questions.length - 1, currentIdx + 1))
                  }
                }
                }
                style={nextBtn}>{currentIdx == questions.length - 1 ? `Submit Exam` : `Save & Next`}
              </button>
            </div>
          </div>
        </main>

        <aside style={rightPanel}>
          <h3 style={panelTitle}>Live Proctoring</h3>
          <div style={webcamContainer}>
            <video ref={videoRef} autoPlay playsInline muted style={videoStyle} />
          </div>
          <div style={monitorInfo}>
            <p style={{ color: 'green', fontWeight: 'bold' }}>● Camera: Active</p>
            <p style={{ color: 'green', fontWeight: 'bold' }}>● Audio: Monitoring</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

const modalOverlay = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 };
const modalContent = { backgroundColor: '#fff', padding: '30px', borderRadius: '15px', textAlign: 'center', width: '350px' };
const cancelBtn = { padding: '10px 15px', borderRadius: '8px', border: '1px solid #ccc', cursor: 'pointer' };
const confirmBtn = { padding: '10px 15px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: '#E30613', color: '#fff', fontWeight: 'bold' };
const containerStyle = { backgroundColor: '#F5F5F5', minHeight: '100vh', fontFamily: 'Arial, sans-serif' };
const navStyle = { backgroundColor: '#E30613', padding: '10px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff' };
const navLeft = { display: 'flex', alignItems: 'center', gap: '30px' };
const logoStyle = { fontSize: '24px', fontWeight: 'bold', fontStyle: 'italic' };
const timerBox = { display: 'flex', flexDirection: 'column', alignItems: 'center' };
const timerLabel = { fontSize: '10px' };
const timerValue = { fontSize: '28px', fontWeight: 'bold' };
const subHeader = { display: 'flex', justifyContent: 'space-between', padding: '10px 40px', alignItems: 'center', position: 'relative' };
const warningText = { color: '#E30613', fontWeight: 'bold' };
const toastStyle = { position: 'absolute', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#E30613', color: '#fff', padding: '5px 15px', borderRadius: '5px', fontSize: '14px', animation: 'fadeIn 0.5s' };
const endExamBtn = { padding: '5px 15px', borderRadius: '5px', border: '1px solid #ccc', cursor: 'pointer', backgroundColor: '#fff' };
const mainLayout = { display: 'grid', gridTemplateColumns: '220px 1fr 280px', gap: '20px', padding: '0 40px' };
const leftPanel = { backgroundColor: '#fff', padding: '20px', borderRadius: '15px', height: 'fit-content' };
const panelTitle = { margin: '0 0 15px', fontSize: '18px' };
const gridContainer = { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' };
const gridItem = { height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' };
const centerPanel = { display: 'flex', flexDirection: 'column', gap: '15px' };
const questionHeader = { backgroundColor: '#E30613', color: '#fff', padding: '10px 20px', borderRadius: '10px 10px 0 0' };
const questionCard = { backgroundColor: '#fff', padding: '40px', borderRadius: '0 0 15px 15px', minHeight: '300px' };
const questionTitle = { fontSize: '20px', marginBottom: '25px' };
const optionsGrid = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' };
const optionBox = { padding: '15px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center' };
const actionButtons = { display: 'flex', justifyContent: 'space-between' };
const prevBtn = { backgroundColor: '#DDD', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' };
const nextBtn = { backgroundColor: '#E30613', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' };
const rightPanel = { backgroundColor: '#fff', padding: '20px', borderRadius: '15px', height: 'fit-content' };
const webcamContainer = { width: '100%', height: '180px', background: '#000', borderRadius: '10px', overflow: 'hidden', marginBottom: '10px' };
const videoStyle = { width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)', display: 'block' };
const monitorInfo = { fontSize: '13px', lineHeight: '1.8' };
const centerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' };

export default ExamPage;