import { useEffect, useState } from 'react';
import { StudentLogin } from './StudentLogin';
import StudentRegister from './StudentRegisterForm';
import VideoPopup from '../ScholarshipForm/YoutubeVideo/VideoPopup';
import VideoThumbnail from '../ScholarshipForm/YoutubeVideo/VideoThumbnail';
import { API_CONFIG, COLORS, FONTS } from '../../common/config';

const QuizLandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [data, setData] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.QUIZ_LANDING}`
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

  const videos = ['/assetss/vid1.mp4', '/assetss/vid2.mp4'];

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    alert(`Success! ${waitlistEmail} has been added to the waitlist.`);
    setWaitlistEmail('');
  };

  if (isError) return <div className="min-h-screen bg-kelloggs-red text-white flex items-center justify-center text-[1.2rem]">No data</div>;
  if (isLoading) return <div className="min-h-screen bg-kelloggs-red text-white flex items-center justify-center text-[1.2rem]">Loading...</div>;

  return (
    <div style={{ fontFamily: FONTS.primary, backgroundColor: '#fff', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>

      <style>
        {`
          /* BIG ATTRACTIVE ANIMATIONS */
          @keyframes elastic-appear {
            0% { opacity: 0; transform: translateY(100px) scale(0.5); }
            60% { opacity: 1; transform: translateY(-20px) scale(1.1); }
            80% { transform: translateY(10px) scale(0.95); }
            100% { transform: translateY(0) scale(1); }
          }

          @keyframes float-idle {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(1deg); }
          }

          .step-card { 
            position: relative;
            transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); /* Bouncy transition */
            cursor: pointer; 
            animation: elastic-appear 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) backwards;
          }

          /* Continuous floating for "Alive" feel */
          .step-card:nth-child(1) { animation: elastic-appear 0.8s 0.2s backwards, float-idle 4s ease-in-out 1s infinite; }
          .step-card:nth-child(2) { animation: elastic-appear 0.8s 0.4s backwards, float-idle 5s ease-in-out 1.2s infinite ease-in; }
          .step-card:nth-child(3) { animation: elastic-appear 0.8s 0.6s backwards, float-idle 4.5s ease-in-out 1.4s infinite reverse; }

          /* DRAMATIC HOVER */
          .step-card:hover { 
            z-index: 10;
            transform: scale(1.15) translateY(-25px) rotate(-2deg) !important; /* Override float */
            box-shadow: 0 30px 60px rgba(246, 9, 69, 0.3); /* Big Red/Pink Glow */
            animation-play-state: paused;
          }

          /* Inner card transform on hover */
          .step-card:hover .step-card-inner {
            background: linear-gradient(135deg, #fff 0%, #FFF0F3 100%); /* Reddish tint */
            border-color: #F60945;
            transform: skewX(-2deg);
          }
          
          .step-card-inner {
            transition: all 0.4s ease;
            border: 2px solid transparent;
            transform-origin: center;
          }

          /* Gallery Image Styles */
          .gallery-image { transition: transform 0.3s ease; cursor: pointer; }
          .gallery-image:hover { transform: scale(1.03); }
          
          /* Image Lightbox with close button */
          .image-lightbox { 
            position: fixed; 
            top: 0; 
            left: 0; 
            width: 100%; 
            height: 100%; 
            background: rgba(0,0,0,0.9); 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            z-index: 3000;
            cursor: pointer;
          }
          .image-lightbox img { 
            max-width: 85%; 
            max-height: 85%; 
            object-fit: contain; 
            border-radius: 12px;
            cursor: default;
          }
          .lightbox-close {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: rgba(255,255,255,0.9);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 28px;
            color: #333;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
          }
          .lightbox-close:hover {
            background: #E31837;
            color: white;
            transform: scale(1.1) rotate(90deg);
          }
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
            left: -15px;
            top: -10px;
            width: clamp(140px, 18vw, 300px);
            height: auto;
            z-index: 50;
            animation: swing 3s ease-in-out infinite;
            transform-origin: top center;
          }
           @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .step-card { 
            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55); 
            cursor: pointer; 
            position: relative;
            animation: fadeInUp 0.8s ease-out backwards;
          }
          .step-card:nth-child(1) { animation-delay: 0.2s; }
          .step-card:nth-child(2) { animation-delay: 0.4s; }
          .step-card:nth-child(3) { animation-delay: 0.6s; }

          @media (min-width: 768px) {
            .hanging-monkey { width: clamp(220px, 20vw, 350px); left: -20px; }
          }
          @media (min-width: 1024px) {
            .hanging-monkey { width: clamp(260px, 20vw, 380px); left: -25px; }
          }
          @media (min-width: 1280px) {
            .hanging-monkey { width: clamp(300px, 22vw, 480px); left: -30px; }
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

      {/* Hanging monkey - Hidden on very small screens */}
      <img
        src="/assetss/hangingMonkey.png"
        alt="Coco"
        className="hanging-monkey hidden sm:block"
      />
      
      {/* Header - Responsive */}
      <header style={headerStyle}>
        <div style={headerInner}>
          <div style={headerTextContainer}>
            <h1 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] m-0 font-extrabold"
              style={{ lineHeight: 1.3 }}
              dangerouslySetInnerHTML={{ 
                __html: data.heading?.replace(/Where/g, 'Where <br class="hidden md:block" />') || '' 
              }}
            />
            <p className="text-sm sm:text-base md:text-lg lg:text-[20px] mt-3 opacity-90 leading-[1.5]">
              {data.sub_heading}
            </p>
          </div>

          <div style={headerActionArea}>
            {/* Action area empty or icon since login button moved to card */}
          </div>
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-10">

        {/* How to Participate Section - Responsive */}
        <section style={roadmapSection}>
          <h2 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold text-[#333] mb-12 md:mb-20">How to Participate</h2>
          <div className="relative max-w-full md:max-w-[900px] mx-auto">
            {/* SVG Path - Hidden on mobile */}
            <svg className="hidden md:block absolute top-0 left-0 w-full h-full z-0" viewBox="0 0 800 500" fill="none">
              <path d="M400 100 H700 C780 100 780 380 700 380 H100" stroke="#D3D3D3" strokeWidth="5" strokeDasharray="15 15" />
            </svg>
            
            {/* Steps - Stacked on mobile, side-by-side on desktop */}
            <div className="flex flex-col md:flex-row md:justify-between relative z-1 gap-6 md:gap-0">
              <div className="step-card flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-5 md:w-[45%]">
                <div className="step-badge" style={stepNumberBadge}>1</div>
                <div style={{ ...stepCardInner, borderBottom: `8px solid ${COLORS.gold}` }}>
                  <h4 style={stepCardTitle}>{data.second_component?.sections?.[0]?.title}</h4>
                  <p style={stepCardDesc}>{data.second_component?.sections?.[0]?.description}</p>
                </div>
              </div>
              <div className="step-card flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-5 md:w-[45%]">
                <div className="step-badge" style={stepNumberBadge}>2</div>
                <div style={{ ...stepCardInner, borderBottom: `8px solid ${COLORS.red}` }}>
                  <h4 style={stepCardTitle}>{data.second_component?.sections?.[1]?.title}</h4>
                  <p style={stepCardDesc}>{data.second_component?.sections?.[1]?.description}</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row md:justify-start mt-6 md:mt-[100px] relative z-1">
              <div className="step-card flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-5 md:w-[45%]">
                <div className="step-badge" style={stepNumberBadge}>3</div>
                <div style={{ ...stepCardInner, borderBottom: `8px solid ${COLORS.gold}` }}>
                  <h4 style={stepCardTitle}>{data.second_component?.sections?.[2]?.title}</h4>
                  <p style={stepCardDesc}>{data.second_component?.sections?.[2]?.description}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Registration and Login Cards Section - Responsive */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-[25px] justify-center mb-16 md:mb-20 mt-12 md:mt-20">
          <div className="card-anim w-full md:max-w-[400px] p-8 md:p-10 flex flex-col" style={yellowCard}>
            <div style={iconBox}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill={COLORS.red}>
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
            <h3 className="text-lg md:text-[22px] font-extrabold mb-2 md:mb-[10px] text-[#333]">Join Superstars?</h3>
            <p className="text-sm md:text-base text-[#444] leading-[1.4] mb-6 md:mb-[25px] flex-1">
              Ready to showcase your students' academic brilliance on a national stage? Register now to be a part of the most exciting educational quiz show.
            </p>
            <button
              className="w-full"
              style={redBtn}
              onClick={() => setShowRegister(true)}
            >
              Register Now
            </button>
          </div>

          <div className="card-anim w-full md:max-w-[400px] p-8 md:p-10 flex flex-col" style={yellowCard}>
            <div style={iconBox}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill={COLORS.red}>
                <path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg md:text-[22px] font-extrabold mb-2 md:mb-[10px] text-[#333]">Already Registered?</h3>
            <p className="text-sm md:text-base text-[#444] leading-[1.4] mb-6 md:mb-[25px] flex-1">
              Enter your credentials to access the exam portal and start your journey to becoming a Superstar.
            </p>
            <button className="w-full" style={redBtn} onClick={() => setShowLogin(true)}>
              Student Login
            </button>
          </div>
        </div>

        {/* Rewatch Section - Responsive */}
        <section className="mt-16 md:mt-[120px] text-center">
          <h2 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold text-[#333] mb-6 md:mb-8">Missed an episode or two? Catch up with the Superstars</h2>
          <p className="text-sm sm:text-base md:text-lg text-[#555] max-w-full md:max-w-[700px] mx-auto mb-8 md:mb-10">
            Re-watch your favorite moments and exciting challenges from this season and past years. Every episode of the Kellogg's Superstars Quiz Show is right here! Don't miss a second.
          </p>

          {/* Media Grid - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-10">
            {data.third_component?.images?.map((image, index) =>
              <div 
                className="gallery-image w-full h-[200px] md:h-[220px] bg-gray-300 rounded-2xl overflow-hidden" 
                key={index}
                onClick={() => setActiveImage(image)}
              >
                <img
                  src={image}
                  alt={`Gallery moment ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Image Lightbox */}
          {activeImage && (
            <div className="image-lightbox" onClick={() => setActiveImage(null)}>
              <div className="lightbox-close" onClick={() => setActiveImage(null)}>
                ✕
              </div>
              <img src={activeImage} alt="Full view" onClick={(e) => e.stopPropagation()} />
            </div>
          )}

          {/* Video Grid - Responsive */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-8 md:mb-10">
              {videos.map((video, i) => (
                <VideoThumbnail
                  key={i}
                  url={video}
                  onClick={setActiveVideo}
                  className="h-[200px] md:h-[250px]"
                  playIconSize='large'
                />
              ))}
            </div>

            <VideoPopup
              url={activeVideo}
              onClose={() => setActiveVideo(null)}
            />
          </div>

          <a 
            href="https://www.youtube.com/@kelloggsnigeria2248" 
            target="_blank" 
            rel="noreferrer" 
            className="inline-block w-auto px-8 md:px-10 py-3 md:py-4 no-underline text-sm md:text-base"
            style={redBtn}
          >
            Watch all episodes here
          </a>
        </section>

        {/* Waitlist Section - Responsive */}
        <section className="my-16 md:my-[120px] p-8 md:p-[60px] bg-[#fff7d6ff] rounded-3xl md:rounded-[40px] text-center">
          <div className="max-w-full md:max-w-[800px] mx-auto flex flex-col items-center gap-6 md:gap-[30px]">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-[32px] font-extrabold text-[#333] mb-2 md:mb-[10px]">Join the Waitlist</h2>
              <p className="text-sm sm:text-base md:text-lg text-[#666] max-w-full md:max-w-[600px] mx-auto leading-[1.6]">
                Be the first to know when the registration is open, exam date and many more information.
              </p>
            </div>
            <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-3 md:gap-[10px] w-full max-w-full md:max-w-[500px]">
              <input
                type="email"
                placeholder="Enter School Email"
                className="flex-1 sm:flex-[2] p-3 md:p-4 rounded-xl md:rounded-[15px] border-2 outline-none text-sm md:text-base"
                style={{ borderColor: COLORS.gold, fontFamily: FONTS.primary }}
                required
                value={waitlistEmail}
                onChange={(e) => setWaitlistEmail(e.target.value)}
              />
              <button type="submit" className="px-6 py-3 md:py-4 text-sm md:text-base" style={redBtn}>Join</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

const headerStyle = {
  backgroundColor: COLORS.red,
  color: '#fff',
  padding: '100px 20px 80px',
  borderBottomLeftRadius: '50% 12%',
  borderBottomRightRadius: '50% 12%',
  position: 'relative',
  overflow: 'hidden',
  marginTop: '0',
  paddingTop: '100px'
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
  maxWidth: '1000px',
  margin: '0 auto'
};

const iconBox = { 
  backgroundColor: '#fff', 
  width: '64px', 
  height: '64px', 
  borderRadius: '20px', 
  margin: '0 auto 15px', 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center', 
  fontSize: '34px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
};

const headerActionArea = { display: 'flex', alignItems: 'center', gap: '15px' };
const yellowCard = { 
  backgroundColor: COLORS.gold, 
  borderRadius: '30px', 
  textAlign: 'center', 
  boxShadow: '0 8px 25px rgba(0,0,0,0.08)' 
};

const redBtn = { 
  backgroundColor: COLORS.red, 
  color: '#fff', 
  border: 'none', 
  padding: '14px', 
  borderRadius: '12px', 
  fontWeight: '700', 
  cursor: 'pointer', 
  fontFamily: FONTS.primary 
};

const goldBtn = {
  backgroundColor: COLORS.gold,
  color: COLORS.red,
  border: 'none', 
  padding: '14px', 
  borderRadius: '12px', 
  fontWeight: '800', 
  cursor: 'pointer', 
  fontFamily: FONTS.primary,
  boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
};

const roadmapSection = { marginTop: '0', textAlign: 'center', position: 'relative' };
const stepNumberBadge = { 
  width: '55px', 
  height: '55px', 
  borderRadius: '50%', 
  backgroundColor: COLORS.gold, 
  color: '#fff', 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center', 
  fontSize: '24px', 
  fontWeight: '800', 
  flexShrink: 0, 
  boxShadow: '0 6px 15px rgba(255,204,0,0.3)' 
};

const stepCardInner = { 
  backgroundColor: '#fff', 
  padding: '25px', 
  borderRadius: '20px', 
  textAlign: 'left', 
  boxShadow: '0 12px 30px rgba(0,0,0,0.06)', 
  flex: 1 
};

const stepCardTitle = { margin: '0 0 8px', fontSize: '20px', fontWeight: '700', color: '#333' };
const stepCardDesc = { margin: 0, fontSize: '14px', color: '#666', lineHeight: '1.5' };
const modalOverlay = { 
  position: 'fixed', 
  top: 0, 
  left: 0, 
  width: '100%', 
  height: '100%', 
  backgroundColor: 'rgba(0,0,0,0.6)', 
  backdropFilter: 'blur(5px)', 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  zIndex: 2000 
};

export default QuizLandingPage;