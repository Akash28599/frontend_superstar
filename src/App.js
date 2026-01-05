import './App.css';
import HomePage from './Pages/HomePage';
import ScholarshipPage from './Pages/ScholarshipPage';
import FooterLayout from './Components/Footer';
import Navbar from "./Components/Navbar"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import QuizPage from './Pages/QuizPage';
import { Height } from '@mui/icons-material';

function App() {
  const [settingsData, setSettingsData] = useState(null);
  useEffect(() => {
    const getFooterData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_STRAPI_URL}/api/sitesettings?populate=*`
        );
        const json = await res.json();
        console.log(json);
        setSettingsData(json?.data?.[0]);
        //const settings = settingsData?.data?.[0];

      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };
    getFooterData();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <div style={{backgroundColor:'#dd2120',height:'0px'} }>
          <Navbar />
        </div>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/scholarship' element={<ScholarshipPage settingsData={settingsData} />} />
          <Route path='/quiz' element={<QuizPage />} />
        </Routes>
      </BrowserRouter>

      <FooterLayout settingsData={settingsData} />
    </div>
  );
}

export default App;