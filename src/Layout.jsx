import './App.css';
import HomePage from './Pages/HomePage';
import ScholarshipPage from './Pages/ScholarshipPage';
import Navbar from "./Components/Navbar"
import {  Route, Routes, useLocation } from 'react-router-dom';
import QuizPage from './Pages/QuizPage';
import { PastWinners } from './Pages/PastWinners/PastWinners';
import ExamPage from './Components/QuizRegistration/ExamPage';

export function LayoutComponent({ settingsData,dpr }) {
  const location = useLocation();
  const hidePaths=['/past-winners','/student-register','/exam-page']
  const hideNavbar = hidePaths.includes(location.pathname);

  return (
    <>
      {!hideNavbar && (
        <div style={{ backgroundColor: '#dd2120', height: '0px' }}>
          <Navbar />
        </div>
      )}

      <Routes>
        <Route path='/' element={<HomePage dpr={dpr}/>} />
        <Route path='/scholarship' element={<ScholarshipPage settingsData={settingsData} />} />
        <Route path='/quiz' element={<QuizPage />} />
        <Route path='/past-winners' element={<PastWinners />} />
        <Route path='/exam-page' element={<ExamPage/>}/>
      </Routes>
    </>
  );
}
