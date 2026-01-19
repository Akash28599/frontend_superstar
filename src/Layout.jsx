import './App.css';
import HomePage from './Pages/HomePage';
import ScholarshipPage from './Pages/ScholarshipPage';
import Navbar from "./Components/Navbar"
import { Route, Routes, useLocation } from 'react-router-dom';
import QuizPage from './Pages/QuizPage';
import { PastWinners } from './Pages/PastWinners/PastWinners';
import ExamPage from './Components/QuizRegistration/ExamPage';
import Instructions from './Components/QuizRegistration/Instructions';
import ThankYou from './Components/QuizRegistration/ThankYou';
import ClubPage from './Pages/ClubPage';
import FooterLayout from './Components/Footer';

export function LayoutComponent({ settingsData, scalePercentage }) {
  const location = useLocation();
  const hidePathsNav = ['/past-winners', '/student-register', '/exam-page', '/instructions','/']
  const hideNavbar = hidePathsNav.includes(location.pathname);
  const hidePathsFooter = ['/exam-page', '/instructions', '/club']
  const hideFooter = hidePathsFooter.includes(location.pathname);
  const isClubPage = location.pathname === '/club';

  return (
    <>
      {!hideNavbar && (
        <div style={{ backgroundColor: '#F60945', height: isClubPage ? '110px' : '0px', transition: 'height 0.3s ease' }}>
          <Navbar />
        </div>
      )}

      <Routes>
        <Route path='/' element={<HomePage scalePercentage={scalePercentage} />} />
        <Route path='/scholarship' element={<ScholarshipPage settingsData={settingsData} />} />
        <Route path='/club' element={<ClubPage />} />
        <Route path='/quiz' element={<QuizPage />} />
        <Route path='/past-winners' element={<PastWinners />} />
        <Route path='/exam-page' element={<ExamPage />} />
        <Route path='/instructions' element={<Instructions />} />
        <Route path='/thank-you' element={<ThankYou />} />
      </Routes>
      {!hideFooter && (
        <FooterLayout settingsData={settingsData} />
      )}

    </>
  );
}
