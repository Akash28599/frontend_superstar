import './App.css';
import HomePage from './Pages/HomePage';
import ScholarshipPage from './Pages/ScholarshipPage';
import Navbar from "./Components/Navbar"
import {  Route, Routes, useLocation } from 'react-router-dom';
import QuizPage from './Pages/QuizPage';
import { PastWinners } from './Pages/PastWinners/PastWinners';

export function LayoutComponent({ settingsData }) {
  const location = useLocation();
  const hideNavbar = location.pathname === '/past-winners';

  return (
    <>
      {!hideNavbar && (
        <div style={{ backgroundColor: '#dd2120', height: '0px' }}>
          <Navbar />
        </div>
      )}

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/scholarship' element={<ScholarshipPage settingsData={settingsData} />} />
        <Route path='/quiz' element={<QuizPage />} />
        <Route path='/past-winners' element={<PastWinners />} />
      </Routes>
    </>
  );
}
