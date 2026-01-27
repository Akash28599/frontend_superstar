import HomePage from '../Pages/HomePage';
import ScholarshipPage from '../Pages/ScholarshipPage';
import { Route, Routes, useLocation } from 'react-router-dom';
import QuizPage from '../Pages/QuizPage';
import { PastWinners } from '../Pages/PastWinners/PastWinners';
import ExamPage from '../Components/QuizRegistration/ExamPage';
import Instructions from '../Components/QuizRegistration/Instructions';
import ThankYou from '../Components/QuizRegistration/ThankYou';
import ClubPage from '../Pages/ClubPage';
import StoriesBlogs from '../Components/StoriesBlogs/StoriesBlogs';
import BlogDetail from '../Components/StoriesBlogs/BlogDetail';
import Navbar from './Navbar';
import FooterLayout from './Footer';

export function LayoutComponent({ settingsData, dpr }) {
  const location = useLocation();
  const hidePathsNav = ['/past-winners', '/student-register', '/exam-page', '/instructions']
  const hideNavbar = hidePathsNav.includes(location.pathname);
  const hidePathsFooter = ['/exam-page', '/instructions']
  const hideFooter = hidePathsFooter.includes(location.pathname);
  const isClubPage = location.pathname === '/club';
  const isHomePage = location.pathname === '/';

  const isRedHeader = location.pathname.startsWith('/stories') || location.pathname.startsWith('/blog') || isHomePage;

  return (
    <>
      {!hideNavbar && (
        <div style={{ 
          backgroundColor: isHomePage ? 'transparent' : '#F60945', 
          minHeight: isClubPage ? '110px' : (isRedHeader ? '100px' : '0px'),
          height: 'auto',
          paddingBottom: isClubPage ? '20px' : (isRedHeader ? '15px' : '0px'),
          paddingTop: '10px',
          transition: 'all 0.3s ease',
          overflow: 'visible',
          position: isHomePage ? 'absolute' : 'relative',
          width: '100%',
          zIndex: 100,
        }} className="pl-0 md:pl-[180px]">
          <Navbar />
        </div>
      )}

      <Routes>
        <Route path='/' element={<HomePage dpr={dpr} />} />
        <Route path='/scholarship' element={<ScholarshipPage settingsData={settingsData} />} />
        <Route path='/club' element={<ClubPage />} />
        <Route path='/quiz' element={<QuizPage />} />
        <Route path='/past-winners' element={<PastWinners />} />
        <Route path='/exam-page' element={<ExamPage />} />
        <Route path='/instructions' element={<Instructions />} />
        <Route path='/thank-you' element={<ThankYou />} />
        <Route path='/stories' element={<StoriesBlogs type="stories" />} />
        <Route path='/stories/:id' element={<BlogDetail siteSettings={settingsData}/>} /> 
        <Route path='/blog' element={<StoriesBlogs type="blogs" />} />
        <Route path='/blog/:id' element={<BlogDetail siteSettings={settingsData}/>} />
      </Routes>
      {!hideFooter && (
        <FooterLayout settingsData={settingsData} />
      )}

    </>
  );
}
