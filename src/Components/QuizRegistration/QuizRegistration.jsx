import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentForm from './StudentRegisterForm';

const QuizLandingPage = () => {
  const [pageData, setPageData] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_STRAPI_URL}/api/quiz-landing-page`)
      .then((res) => res.json())
      .then((json) => setPageData(json.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginForm.username && loginForm.password) {
      navigate('/exam-page');
    } else {
      alert("Please fill in both fields!");
    }
  };

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    alert(`Success! ${waitlistEmail} has been added to the waitlist.`);
    setWaitlistEmail('');
  };

  if (!pageData) return <div style={loadingStyle}>Loading...</div>;

  const { heading, sub_heading, first_component, second_component } = pageData;

  return (
    <div style={{ fontFamily:constants.fontFamily, backgroundColor: '#fff', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>

      <style>
        {`
          .card-anim { transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
          .card-anim:hover { transform: translateY(-10px); }
          @keyframes popIn {
            0% { transform: scale(0.9); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes swing {
            0% { transform: rotate(-3deg); }
            50% { transform: rotate(3deg); }
            100% { transform: rotate(-3deg); }
          }
        `}
      </style>

      {showLogin && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <button onClick={() => setShowLogin(false)} style={closeBtn}>×</button>
            <div style={modalIcon}>🔑</div>
            <h2 style={{ fontSize: '24px', margin: '0 0 5px', color: '#333' }}>Student Login</h2>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '25px' }}>Enter your details to start the quiz!</p>

            <form onSubmit={handleLoginSubmit} style={{ textAlign: 'left' }}>
              <div style={inputGroup}>
                <label style={labelStyle}>Username</label>
                <input
                  type="text"
                  placeholder="Your username"
                  style={inputStyle}
                  required
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                />
              </div>
              <div style={inputGroup}>
                <label style={labelStyle}>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  style={inputStyle}
                  required
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                />
              </div>
              <button type="submit" style={modalLoginBtn}>Login & Start Exam</button>
            </form>
          </div>
        </div>
      )}
      {showRegister && (
        <div style={modalOverlay}>
          <StudentForm onClose={() => setShowRegister(false)} />
        </div>
      )}
      <header style={headerStyle}>
        <div style={headerInner}>
          <img src={first_component.student_exam_login.image} alt="Coco" style={cocoStyle} />
          <div style={headerTextContainer}>
            <h1 style={titleStyle}>{heading}</h1>
            <p style={subtitleStyle}>{sub_heading}</p>
          </div>
          <div style={headerActionArea}>
            <img src={first_component.daily_challenges.image} alt="Coco Head" style={cocoHeadIcon} />
            <div style={helpCircle}>?</div>
          </div>
        </div>
      </header>

      <main style={mainContent}>
        <div style={cardRow}>
          <div className="card-anim" style={yellowCard}>
            <div style={iconBox}>🏆</div>
            <h3 style={cardTitle}>{first_component.daily_challenges.title}</h3>
            <p style={cardDesc}>{first_component.daily_challenges.description}</p>
            <button style={whiteBtn}>Start Daily Quiz</button>
          </div>

          <div className="card-anim" style={yellowCard}>
            <div style={iconBox}>⭐</div>
            <h3 style={cardTitle}>{first_component.school_registration.title}</h3>
            <p style={cardDesc}>{first_component.school_registration.description}</p>
            <button
              style={redBtn}
              onClick={() => setShowRegister(true)}
            >
              Register Now
            </button>

          </div>

          <div className="card-anim" style={yellowCard}>
            <div style={iconBox}>🔑</div>
            <h3 style={cardTitle}>{first_component.student_exam_login.title}</h3>
            <p style={cardDesc}>{first_component.student_exam_login.description}</p>
            <button style={redBtn} onClick={() => setShowLogin(true)}>Start Exam</button>
          </div>
        </div>

        <section style={roadmapSection}>
          <h2 style={sectionHeading}>How It Works</h2>
          <div style={roadmapContainer}>
            <svg style={roadmapSvg} viewBox="0 0 800 500" fill="none">
              <path d="M400 100 H700 C780 100 780 380 700 380 H100" stroke="#D3D3D3" strokeWidth="5" strokeDasharray="15 15" />
            </svg>
            <div style={stepRow}>
              <div style={stepWrapper}>
                <div style={stepNumberBadge}>1</div>
                <div style={{ ...stepCardInner, borderBottom: '8px solid #FFCC00' }}>
                  <h4 style={stepCardTitle}>{second_component.sections[0]?.title}</h4>
                  <p style={stepCardDesc}>{second_component.sections[0]?.description}</p>
                </div>
              </div>
              <div style={stepWrapper}>
                <div style={stepNumberBadge}>2</div>
                <div style={{ ...stepCardInner, borderBottom: '8px solid #E30613' }}>
                  <h4 style={stepCardTitle}>{second_component.sections[1]?.title}</h4>
                  <p style={stepCardDesc}>{second_component.sections[1]?.description}</p>
                </div>
              </div>
            </div>
            <div style={{ ...stepRow, justifyContent: 'flex-start', marginTop: '100px' }}>
              <div style={stepWrapper}>
                <div style={stepNumberBadge}>3</div>
                <div style={{ ...stepCardInner, borderBottom: '8px solid #FFCC00' }}>
                  <h4 style={stepCardTitle}>{second_component.sections[2]?.title}</h4>
                  <p style={stepCardDesc}>{second_component.sections[2]?.description}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={waitlistSection}>
          <div style={waitlistContainer}>
            <div style={waitlistTextContent}>
              <h2 style={waitlistHeading}>Join the Waitlist</h2>
              <p style={waitlistSubtext}>
                Be the first to know about upcoming exam dates, proctoring schedules,
                and scholarship winner announcements.
              </p>
            </div>
            <form onSubmit={handleWaitlistSubmit} style={waitlistForm}>
              <input
                type="email"
                placeholder="Enter School Email"
                style={waitlistInput}
                required
                value={waitlistEmail}
                onChange={(e) => setWaitlistEmail(e.target.value)}
              />
              <button type="submit" style={waitlistBtn}>Join</button>
            </form>
          </div>
        </section>

      </main>

    </div>
  );
};
const constants = { red: '#dd2120' ,fontFamily:'"KelloggsSans", Arial, sans-serif'}
const headerStyle = { backgroundColor: constants.red, color: '#fff', padding: '140px 20px 100px', borderBottomLeftRadius: '50% 12%', borderBottomRightRadius: '50% 12%', position: 'relative' };
const headerInner = { maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', position: 'relative' };
const cocoStyle = { position: 'absolute', left: '-40px', top: '-40px', width: '230px', zIndex: 10, animation: 'swing 3s ease-in-out infinite' };
const headerTextContainer = { textAlign: 'center', flex: 1, paddingLeft: '140px' };
const titleStyle = { fontSize: '46px', margin: 0, fontWeight: '800' };
const subtitleStyle = { fontSize: '20px', margin: '5px 0 0', opacity: 0.9 };
const headerActionArea = { display: 'flex', alignItems: 'center', gap: '15px' };
const cocoHeadIcon = { width: '45px', height: '45px', borderRadius: '50%', border: '2px solid #fff', backgroundColor: '#fff' };
const helpCircle = { width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' };
const mainContent = { maxWidth: '1100px', margin: '40px auto 0', padding: '0 20px' };
const cardRow = { display: 'flex', gap: '25px', justifyContent: 'center' };
const yellowCard = { backgroundColor: '#ffcc00', borderRadius: '30px', padding: '35px 25px', flex: 1, maxWidth: '320px', textAlign: 'center', boxShadow: '0 8px 25px rgba(0,0,0,0.08)' };
const iconBox = { backgroundColor: '#fff', width: '55px', height: '55px', borderRadius: '15px', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' };
const cardTitle = { fontSize: '22px', fontWeight: '800', margin: '0 0 10px', color: '#333' };
const cardDesc = { fontSize: '14px', color: '#444', lineHeight: '1.4', marginBottom: '25px', height: '50px' };
const redBtn = { backgroundColor: constants.red, color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', width: '100%', fontWeight: '700', cursor: 'pointer' };
const whiteBtn = { ...redBtn, backgroundColor: '#fff', color: constants.red };
const roadmapSection = { marginTop: '160px', textAlign: 'center', position: 'relative' };
const sectionHeading = { fontSize: '34px', fontWeight: '800', color: '#333', marginBottom: '80px' };
const roadmapContainer = { position: 'relative', maxWidth: '900px', margin: '0 auto' };
const roadmapSvg = { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 };
const stepRow = { display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 1 };
const stepWrapper = { display: 'flex', alignItems: 'center', gap: '20px', width: '45%', position: 'relative' };
const stepNumberBadge = { width: '55px', height: '55px', borderRadius: '50%', backgroundColor: '#FFCC00', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '800', flexShrink: 0, boxShadow: '0 6px 15px rgba(255,204,0,0.3)' };
const stepCardInner = { backgroundColor: '#fff', padding: '25px', borderRadius: '20px', textAlign: 'left', boxShadow: '0 12px 30px rgba(0,0,0,0.06)', flex: 1 };
const stepCardTitle = { margin: '0 0 8px', fontSize: '20px', fontWeight: '700', color: '#333' };
const stepCardDesc = { margin: 0, fontSize: '14px', color: '#666', lineHeight: '1.5' };
const waitlistSection = { margin: '120px 0', padding: '60px 20px', backgroundColor: '#fff9e6', borderRadius: '40px', textAlign: 'center' };
const waitlistContainer = { maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' };
const waitlistTextContent = { textAlign: 'center' };
const waitlistHeading = { fontSize: '32px', fontWeight: '800', color: '#333', margin: '0 0 10px' };
const waitlistSubtext = { fontSize: '16px', color: '#666', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' };
const waitlistForm = { display: 'flex', gap: '10px', width: '100%', maxWidth: '500px' };
const waitlistInput = { flex: 2, padding: '15px 20px', borderRadius: '15px', border: '2px solid #ffcc00', outline: 'none', fontSize: '16px' };
const waitlistBtn = { flex: 1, backgroundColor: constants.red, color: '#fff', border: 'none', padding: '15px 25px', borderRadius: '15px', fontWeight: '800', cursor: 'pointer', whiteSpace: 'nowrap' };
const footerStyle = { height: '80px', backgroundColor: constants.red, marginTop: '100px', borderRadius: '40px 40px 0 0' };
const loadingStyle = { textAlign: 'center', padding: '100px', fontSize: '24px', color: constants.red };
const modalOverlay = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 };
const modalContent = { backgroundColor: '#fff', padding: '40px', borderRadius: '30px', width: '90%', maxWidth: '400px', textAlign: 'center', position: 'relative', animation: 'popIn 0.3s ease-out' };
const closeBtn = { position: 'absolute', top: '15px', right: '20px', fontSize: '28px', background: 'none', border: 'none', cursor: 'pointer', color: '#999' };
const modalIcon = { width: '70px', height: '70px', backgroundColor: '#ffcc00', borderRadius: '50%', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px' };
const inputGroup = { marginBottom: '15px', textAlign: 'left' };
const labelStyle = { display: 'block', fontWeight: '700', marginBottom: '5px', fontSize: '14px' };
const inputStyle = { width: '100%', padding: '12px', borderRadius: '10px', border: '2px solid #eee', outline: 'none', boxSizing: 'border-box' };
const modalLoginBtn = { width: '100%', padding: '15px', backgroundColor: constants.red, color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', marginTop: '10px' };

export default QuizLandingPage;