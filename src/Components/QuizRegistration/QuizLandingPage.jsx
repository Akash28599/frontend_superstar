import { useEffect, useState } from 'react';
import { StudentLogin } from './StudentLogin';
import StudentRegister from './StudentRegisterForm';
import VideoPopup from '../ScholarshipForm/YoutubeVideo/VideoPopup';
import VideoThumbnail from '../ScholarshipForm/YoutubeVideo/VideoThumbnail';

const QuizLandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(false)
  const [data, setData] = useState(null)
  const [activeVideo, setActiveVideo] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_STRAPI_URL}/api/quiz-landing-page?populate=*`
        );
        const json = await res.json();
        setData(json.data);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const videos = ['/assetss/vid1.mp4', '/assetss/vid2.mp4']
  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    alert(`Success! ${waitlistEmail} has been added to the waitlist.`);
    setWaitlistEmail('');
  };
  if (isError) return <div className="min-h-screen bg-kelloggs-red text-white flex items-center justify-center text-[1.2rem]">No data</div>;
  if (isLoading) return <div className="min-h-screen bg-kelloggs-red text-white flex items-center justify-center text-[1.2rem]">Loading...</div>;
  return (
    <div style={{ fontFamily: constants.fontFamily, backgroundColor: '#fff', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>

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
           /* Responsive Hanging Monkey */
          .hanging-monkey {
            position: absolute;
            left: 0;
            top: 0;
            /* Large size for 100% scale (1920px -> ~384px), scales down robustly */
            width: clamp(280px, 20vw, 450px); 
            height: auto;
            z-index: 10;
            animation: swing 3s ease-in-out infinite;
            transform-origin: top left;
          }
          /* 125% zoom or small laptops (1536px) */
          @media (max-width: 1536px) {
            .hanging-monkey { width: clamp(240px, 18vw, 320px); }
          }
          /* 150% zoom (1280px) */
          @media (max-width: 1280px) {
            .hanging-monkey { width: clamp(200px, 16vw, 260px); }
          }
          /* 175% zoom (~1100px) */
          @media (max-width: 1100px) {
            .hanging-monkey { width: clamp(160px, 15vw, 220px); }
          }
          /* 200% zoom (~960px) and Tablets */
          @media (max-width: 960px) {
            .hanging-monkey { width: 140px; }
          }
        `}
      </style>

      {showLogin && (
        <div style={modalOverlay}>
          <StudentLogin onClose={() => setShowLogin(false)} />
        </div>
      )}
      {showRegister && (
        <div style={modalOverlay}>
          <StudentRegister onClose={() => setShowRegister(false)} />
        </div>
      )}

      {/* Placeholder for hanging monkey or image. User asked for blank divs in image places, primarily for the rewatch section, but standard images might be needed here too. keeping the class. */}
      <img
        src="/assetss/hangingMonkey.png"
        alt="Coco"
        className="hanging-monkey"
      />
      
      <header style={headerStyle}>
        <div style={headerInner}>
          <div style={headerTextContainer}>
            <h1 style={titleStyle}>{data.heading}</h1>
            <p style={subtitleStyle}>
              {data.sub_heading}
            </p>
          </div>

          <div style={headerActionArea}>
            {/* Action area empty or icon since login button moved to card */}
          </div>
        </div>
      </header>

      <main style={mainContent}>

        <section style={roadmapSection}>
          <h2 style={sectionHeading}>How to Participate</h2>
          <div style={roadmapContainer}>
            <svg style={roadmapSvg} viewBox="0 0 800 500" fill="none">
              <path d="M400 100 H700 C780 100 780 380 700 380 H100" stroke="#D3D3D3" strokeWidth="5" strokeDasharray="15 15" />
            </svg>
            <div style={stepRow}>
              <div style={stepWrapper}>
                <div style={stepNumberBadge}>1</div>
                <div style={{ ...stepCardInner, borderBottom: `8px solid ${constants.gold}` }}>
                  <h4 style={stepCardTitle}>{data.second_component?.sections?.[0]?.title}</h4>
                  <p style={stepCardDesc}>{data.second_component?.sections?.[0]?.description}</p>
                </div>
              </div>
              <div style={stepWrapper}>
                <div style={stepNumberBadge}>2</div>
                <div style={{ ...stepCardInner, borderBottom: `8px solid ${constants.red}` }}>
                  <h4 style={stepCardTitle}>{data.second_component?.sections?.[1]?.title}</h4>
                  <p style={stepCardDesc}>{data.second_component?.sections?.[1]?.description}</p>
                </div>
              </div>
            </div>
            <div style={{ ...stepRow, justifyContent: 'flex-start', marginTop: '100px' }}>
              <div style={stepWrapper}>
                <div style={stepNumberBadge}>3</div>
                <div style={{ ...stepCardInner, borderBottom: `8px solid ${constants.gold}` }}>
                  <h4 style={stepCardTitle}>{data.second_component?.sections?.[2]?.title}</h4>
                  <p style={stepCardDesc}>{data.second_component?.sections?.[2]?.description}</p>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Registration and Login Cards Section */}
        <div style={cardRow}>
          <div className="card-anim" style={{ ...yellowCard, maxWidth: '400px', width: '100%', padding: '40px' }}>
            <h3 style={cardTitle}>Want to Be a Part of the Kellogg’s Superstars Quiz Show?</h3>
            <p style={{ ...cardDesc, height: 'auto', fontSize: '16px' }}>
              Ready to showcase your students' academic brilliance on a national stage? Register now to be a part of the most exciting educational quiz show.
            </p>
            <button
              style={redBtn}
              onClick={() => setShowRegister(true)}
            >
              Register Now
            </button>
          </div>

          <div className="card-anim" style={{ ...yellowCard, maxWidth: '400px', width: '100%', padding: '40px' }}>
            <div style={iconBox}>🔑</div>
            <h3 style={cardTitle}>Already Registered?</h3>
            <p style={{ ...cardDesc, height: 'auto', fontSize: '16px' }}>
              Enter your credentials to access the exam portal and start your journey to becoming a Superstar.
            </p>
            <button style={redBtn} onClick={() => setShowLogin(true)}>
              Student Login
            </button>
          </div>
        </div>

        {/* Rewatch Section */}
        <section style={{ marginTop: '120px', textAlign: 'center' }}>
          <h2 style={sectionHeading}>Missed an episode or two? Catch up with the Superstars</h2>
          <p style={{ fontSize: '18px', color: '#555', maxWidth: '700px', margin: '0 auto 40px' }}>
            Re-watch your favorite moments and exciting challenges from this season and past years. Every episode of the Kellogg’s Superstars Quiz Show is right here! Don’t miss a second.
          </p>

          {/* Media Grid Placeholder - 3 images */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            {data.third_component?.images?.map((image) =>
              <div className="w-[300px] h-[200px] bg-gray-300 rounded-2xl overflow-hidden">
                <img
                  src={image}
                  alt="alt image"
                  className="w-full h-full object-cover"
                />
              </div>

            )}
          </div>




          {/* Media Grid Placeholder - 2 videos */}

          <div>
            <div className="grid grid-cols-2 gap-5 mb-10">
              {videos.map((video, i) => (
                <VideoThumbnail
                  key={i}
                  url={video}
                  onClick={setActiveVideo}
                  className="h-[250px]"
                  playIconSize='large'
                />
              ))}
            </div>

            <VideoPopup
              url={activeVideo}
              onClose={() => setActiveVideo(null)}
            />
          </div>


          <a href="https://www.youtube.com/@kelloggsnigeria2248" target="_blank" rel="noreferrer" style={{ ...redBtn, display: 'inline-block', width: 'auto', padding: '15px 40px', textDecoration: 'none' }}>
            Watch all episodes here
          </a>
        </section>

        <section style={waitlistSection}>
          <div style={waitlistContainer}>
            <div style={waitlistTextContent}>
              <h2 style={waitlistHeading}>Join the Waitlist</h2>
              <p style={waitlistSubtext}>
                Be the first to know when the registration is open, exam date and many more information.
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
              <button type="submit" style={redBtn}>Join</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

const constants = { gold: '#FBCA05', red: '#F60945', fontFamily: '"KelloggsSans", Arial, sans-serif' }

// Keep existing styles or minimal updates
const headerStyle = {
  backgroundColor: constants.red,
  color: '#fff',
  padding: '140px 20px 100px',
  borderBottomLeftRadius: '50% 12%',
  borderBottomRightRadius: '50% 12%',
  position: 'relative',
  overflow: 'hidden',
  marginTop: '0',
  paddingTop: '140px'
};

const headerInner = {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  position: 'relative'
};

const headerTextContainer = {
  textAlign: 'center',
  flex: 1,
  maxWidth: '800px',
  margin: '0 auto'
};

const titleStyle = { fontSize: '46px', margin: 0, fontWeight: '800' };
const subtitleStyle = { fontSize: '20px', margin: '20px 0 0', opacity: 0.9, lineHeight: '1.5' };
const cardRow = { display: 'flex', gap: '25px', justifyContent: 'center', marginBottom: '80px', flexWrap: 'wrap', marginTop: '80px' };
const iconBox = { backgroundColor: '#fff', width: '55px', height: '55px', borderRadius: '15px', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' };
const headerActionArea = { display: 'flex', alignItems: 'center', gap: '15px' };

const mainContent = { maxWidth: '1100px', margin: '40px auto 0', padding: '0 20px' };
const yellowCard = { backgroundColor: constants.gold, borderRadius: '30px', padding: '35px 25px', textAlign: 'center', boxShadow: '0 8px 25px rgba(0,0,0,0.08)' };
const cardTitle = { fontSize: '22px', fontWeight: '800', margin: '0 0 10px', color: '#333' };
const cardDesc = { fontSize: '14px', color: '#444', lineHeight: '1.4', marginBottom: '25px' };
const redBtn = { backgroundColor: constants.red, color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', fontFamily: constants.fontFamily };
const whiteBtn = { ...redBtn, backgroundColor: '#fff', color: constants.red };


const roadmapSection = { marginTop: '0', textAlign: 'center', position: 'relative' };
const sectionHeading = { fontSize: '34px', fontWeight: '800', color: '#333', marginBottom: '80px' };
const roadmapContainer = { position: 'relative', maxWidth: '900px', margin: '0 auto' };
const roadmapSvg = { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 };
const stepRow = { display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 1 };
const stepWrapper = { display: 'flex', alignItems: 'center', gap: '20px', width: '45%', position: 'relative' };
const stepNumberBadge = { width: '55px', height: '55px', borderRadius: '50%', backgroundColor: constants.gold, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '800', flexShrink: 0, boxShadow: '0 6px 15px rgba(255,204,0,0.3)' };
const stepCardInner = { backgroundColor: '#fff', padding: '25px', borderRadius: '20px', textAlign: 'left', boxShadow: '0 12px 30px rgba(0,0,0,0.06)', flex: 1 };
const stepCardTitle = { margin: '0 0 8px', fontSize: '20px', fontWeight: '700', color: '#333' };
const stepCardDesc = { margin: 0, fontSize: '14px', color: '#666', lineHeight: '1.5' };
const waitlistSection = { margin: '120px 0', padding: '60px 20px', backgroundColor: '#fff7d6ff', borderRadius: '40px', textAlign: 'center' };
const waitlistContainer = { maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' };
const waitlistTextContent = { textAlign: 'center' };
const waitlistHeading = { fontSize: '32px', fontWeight: '800', color: '#333', margin: '0 0 10px' };
const waitlistSubtext = { fontSize: '16px', color: '#666', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' };
const waitlistForm = { display: 'flex', gap: '10px', width: '100%', maxWidth: '500px' };
const waitlistInput = { flex: 2, padding: '15px 20px', borderRadius: '15px', border: `2px solid ${constants.gold}`, outline: 'none', fontSize: '16px', fontFamily: constants.fontFamily };
const modalOverlay = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 };

export default QuizLandingPage;