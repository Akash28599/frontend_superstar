import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizLandingPage = () => {
  const [pageData, setPageData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_STRAPI_URL}/api/quiz-landing-page`)
      .then((res) => res.json())
      .then((json) => setPageData(json.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  if (!pageData) return <div style={{ textAlign: 'center', marginTop: '100px', fontSize: '20px' }}>Loading...</div>;

  const { heading, sub_heading, first_component, second_component } = pageData;

  return (
    <div style={{ fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif', backgroundColor: '#fdfdfd', minHeight: '100vh', margin: 0 }}>
      
      <header style={{ 
        backgroundColor: '#d31245', 
        color: 'white', 
        padding: '100px 20px 80px 20px', 
        textAlign: 'center', 
        position: 'relative', 
        borderBottomLeftRadius: '50% 15%', 
        borderBottomRightRadius: '50% 15%',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '30px' 
        }}>
          <img 
            src={first_component.daily_challenges.image} 
            alt="Coco Monkey" 
            style={{ width: '150px', height: 'auto', marginBottom: '-50px', filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.2))' }} 
          />
          
          <div style={{ textAlign: 'left' }}>
            <h1 style={{ fontSize: '48px', margin: '0', fontWeight: '800', letterSpacing: '-1px' }}>{heading}</h1>
            <p style={{ fontSize: '22px', margin: '5px 0 0 0', fontWeight: '400', opacity: '0.9' }}>{sub_heading}</p>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1150px', margin: '80px auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', gap: '25px', justifyContent: 'center', flexWrap: 'wrap' }}>
          
          <div style={cardStyle}>
            <div style={iconWrapperStyle}>
                <img src={first_component.daily_challenges.icon} alt="Daily Challenges" style={iconImgStyle} />
            </div>
            <h3 style={cardTitleStyle}>{first_component.daily_challenges.title}</h3>
            <p style={cardDescStyle}>{first_component.daily_challenges.description}</p>
            <button style={whiteBtnStyle}>{first_component.daily_challenges.button_text}</button>
          </div>

          <div style={cardStyle}>
            <div style={iconWrapperStyle}>
                <img src={first_component.school_registration.icon} alt="School Registration" style={iconImgStyle} />
            </div>
            <h3 style={cardTitleStyle}>{first_component.school_registration.title}</h3>
            <p style={cardDescStyle}>{first_component.school_registration.description}</p>
            <button 
              style={redBtnStyle} 
              onClick={() => navigate('/student-register')} // Change this path to match your route
            >
              {first_component.school_registration.button_text}
            </button>
          </div>

          <div style={cardStyle}>
            <div style={iconWrapperStyle}>
                <img src={first_component.student_exam_login.icon} alt="Student Login" style={iconImgStyle} />
            </div>
            <h3 style={cardTitleStyle}>{first_component.student_exam_login.title}</h3>
            <p style={cardDescStyle}>{first_component.student_exam_login.description}</p>
            <button 
                style={redBtnStyle}
                onClick={() => navigate('/login')} // Change this path to match your login route
            >
                {first_component.student_exam_login.button_text}
            </button>
          </div>

        </div>

        <section style={{ marginTop: '100px', borderTop: '1px solid #eee', paddingTop: '50px' }}>
          <h2 style={{ fontSize: '28px', color: '#333', marginBottom: '30px', textAlign: 'left' }}>How It Works</h2>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {second_component.sections.map((sec, index) => (
              <div key={index} style={infoBoxStyle}>
                <div style={stepCircleStyle}>{index + 1}</div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '16px', color: '#333' }}>{sec.title}</div>
                  <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>{sec.description}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};


const cardStyle = {
  backgroundColor: '#ffcc00', 
  borderRadius: '24px',
  padding: '45px 30px',
  width: '320px',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
  transition: 'transform 0.2s ease-in-out',
};

const iconWrapperStyle = {
  backgroundColor: 'white',
  width: '60px',
  height: '60px',
  borderRadius: '12px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '20px'
};

const iconImgStyle = {
  width: '35px',
  height: '35px',
  objectFit: 'contain'
};

const cardTitleStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#222',
  margin: '10px 0'
};

const cardDescStyle = {
  fontSize: '15px',
  color: '#444',
  marginBottom: '30px',
  lineHeight: '1.5',
  minHeight: '45px'
};

const redBtnStyle = {
  backgroundColor: '#d31245',
  color: 'white',
  border: 'none',
  padding: '14px 0',
  borderRadius: '10px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '16px',
  width: '100%',
  boxShadow: '0 4px 10px rgba(211, 18, 69, 0.3)'
};

const whiteBtnStyle = {
  backgroundColor: 'white',
  color: '#333',
  border: 'none',
  padding: '14px 0',
  borderRadius: '10px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '16px',
  width: '100%',
  boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
};

const infoBoxStyle = {
  backgroundColor: 'white',
  padding: '25px',
  borderRadius: '16px',
  flex: '1 1 300px',
  display: 'flex',
  alignItems: 'center',
  boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
  border: '1px solid #f0f0f0'
};

const stepCircleStyle = {
  backgroundColor: '#fff0f3',
  color: '#d31245',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 'bold',
  fontSize: '18px',
  marginRight: '20px',
  border: '2px solid #d31245'
};

export default QuizLandingPage;

