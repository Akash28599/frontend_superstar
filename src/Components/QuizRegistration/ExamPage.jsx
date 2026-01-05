import React, { useState, useEffect, useRef } from 'react';

const ExamPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(2722);
  const [warnings, setWarnings] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false); // Modal State
  const videoRef = useRef(null);

  // 1. Tab visibility logic
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setWarnings((prev) => {
          const newCount = prev + 1;
          alert(`Warning ${newCount}/3: Please stay on the exam tab.`);
          return newCount;
        });
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);


  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) { console.error(err); }
    };
    startVideo();
    fetch('https://strapi-superstar.onrender.com/api/exam-questions')
      .then(res => res.json())
      .then(json => {
        if (json.data?.[0]?.questions) setQuestions(json.data[0].questions);
        setLoading(false);
      });
  }, []);

  const confirmEndExam = () => {
    window.location.href = '/quiz'; 
  };

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
            <h2 style={{color: '#E30613'}}>End Exam?</h2>
            <p>Are you sure you want to end the exam? Your progress will be saved.</p>
            <div style={{display: 'flex', gap: '15px', marginTop: '20px'}}>
              <button style={cancelBtn} onClick={() => setShowConfirm(false)}>No, Continue</button>
              <button style={confirmBtn} onClick={confirmEndExam}>Yes, End Exam</button>
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
                      onClick={() => setAnswers({...answers, [currentQuestion.id]: opt})}
                      style={{
                        ...optionBox,
                        border: answers[currentQuestion.id] === opt ? '2px solid #2196F3' : '1px solid #FFCC00',
                        backgroundColor: answers[currentQuestion.id] === opt ? '#f0f7ff' : '#fff'
                      }}
                    >
                      <input type="radio" checked={answers[currentQuestion.id] === opt} readOnly />
                      <span style={{marginLeft: '10px'}}>{opt}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
            <div style={actionButtons}>
              <button disabled={currentIdx === 0} onClick={() => setCurrentIdx(currentIdx - 1)} style={prevBtn}>Previous</button>
              <button onClick={() => setCurrentIdx(Math.min(questions.length - 1, currentIdx + 1))} style={nextBtn}>Save & Next</button>
            </div>
          </div>
        </main>

        <aside style={rightPanel}>
          <h3 style={panelTitle}>Live Proctoring</h3>
          <div style={webcamContainer}>
            <video ref={videoRef} autoPlay playsInline muted style={videoStyle} />
          </div>
          <div style={monitorInfo}>
            <p style={{color: 'green'}}>● Camera: Active</p>
            <p style={{color: 'green'}}>● Audio: Monitoring</p>
          </div>
        </aside>
      </div>
    </div>
  );
};


const modalOverlay = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
const modalContent = { backgroundColor: '#fff', padding: '30px', borderRadius: '15px', textAlign: 'center', maxWidth: '400px', boxShadow: '0 5px 15px rgba(0,0,0,0.3)' };
const cancelBtn = { padding: '10px 20px', borderRadius: '8px', border: '1px solid #ccc', cursor: 'pointer', backgroundColor: '#eee' };
const confirmBtn = { padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: '#E30613', color: '#fff', fontWeight: 'bold' };

const containerStyle = { backgroundColor: '#F5F5F5', minHeight: '100vh', fontFamily: 'Arial, sans-serif' };
const navStyle = { backgroundColor: '#E30613', padding: '10px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff' };
const navLeft = { display: 'flex', alignItems: 'center', gap: '30px' };
const navRight = { display: 'flex' };
const logoStyle = { fontSize: '24px', fontWeight: 'bold', fontStyle: 'italic' };
const timerBox = { display: 'flex', flexDirection: 'column', alignItems: 'center' };
const timerLabel = { fontSize: '10px' };
const timerValue = { fontSize: '28px', fontWeight: 'bold' };
const loginBtn = { backgroundColor: '#FFCC00', border: 'none', padding: '10px 20px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' };
const subHeader = { display: 'flex', justifyContent: 'space-between', padding: '10px 40px', alignItems: 'center' };
const warningText = { color: '#E30613', fontWeight: 'bold', fontSize: '16px' };
const endExamBtn = { padding: '5px 15px', borderRadius: '5px', border: '1px solid #ccc', cursor: 'pointer', backgroundColor: '#fff' };
const mainLayout = { display: 'grid', gridTemplateColumns: '250px 1fr 300px', gap: '20px', padding: '0 40px' };
const leftPanel = { backgroundColor: '#fff', padding: '20px', borderRadius: '15px' };
const panelTitle = { margin: '0 0 15px', fontSize: '18px' };
const gridContainer = { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' };
const gridItem = { height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };
const centerPanel = { display: 'flex', flexDirection: 'column', gap: '15px' };
const questionHeader = { backgroundColor: '#E30613', color: '#fff', padding: '10px 20px', borderRadius: '10px 10px 0 0' };
const questionCard = { backgroundColor: '#fff', padding: '40px', borderRadius: '0 0 15px 15px' };
const questionTitle = { fontSize: '22px', marginBottom: '30px' };
const optionsGrid = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' };
const optionBox = { padding: '15px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center' };
const actionButtons = { display: 'flex', justifyContent: 'space-between' };
const prevBtn = { backgroundColor: '#DDD', border: 'none', padding: '12px 25px', borderRadius: '8px', cursor: 'pointer' };
const nextBtn = { backgroundColor: '#E30613', color: '#fff', border: 'none', padding: '12px 25px', borderRadius: '8px', cursor: 'pointer' };
const rightPanel = { backgroundColor: '#fff', padding: '20px', borderRadius: '15px' };
const webcamContainer = { width: '100%', marginBottom: '15px', background: '#000', borderRadius: '10px', height: '180px', overflow: 'hidden' };
const videoStyle = { width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' };
const monitorInfo = { fontSize: '14px', lineHeight: '2' };
const centerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' };

export default ExamPage;