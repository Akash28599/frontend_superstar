import logo from './logo.svg';
import './App.css';
import HomePage from './Pages/HomePage';
import ScholarshipPage from './Pages/ScholarshipPage';
import FooterLayout from './Components/Footer';
import Navbar from "./Components/Navbar"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/scholarship' element={<ScholarshipPage settingsData={settingsData}/>} />
        </Routes>
      </BrowserRouter>

      <FooterLayout settingsData={settingsData}/>
    </div>
  );
}

export default App;
