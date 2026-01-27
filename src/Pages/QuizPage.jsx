import { useEffect, useState } from 'react';
import { API_CONFIG, COLORS, FONTS } from '../common/config';
import { StudentLogin } from '../Components/QuizRegistration/StudentLogin';
import StudentRegister from '../Components/QuizRegistration/StudentRegisterForm';
import YellowCard from '../Components/QuizRegistration/YellowCard';
import Rewatch from '../Components/QuizRegistration/Rewatch';
import QuizWaitlist from '../Components/QuizRegistration/QuizWaitlist';
import Roadmap from '../Components/QuizRegistration/Roadmap';
const QuizPage = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [isError, setError] = useState(false);
    const [data, setData] = useState(null);


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
                src={data.first_component.image}
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
                <Roadmap data={data} />
                <YellowCard data={data} setShowRegister={setShowRegister} setShowLogin={setShowLogin} />

                {/* Rewatch Section - Responsive */}
                <Rewatch data={data} />

                {/* Waitlist Section - Responsive */}
                <QuizWaitlist data={data} />
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
const headerActionArea = { display: 'flex', alignItems: 'center', gap: '15px' };
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

export default QuizPage;