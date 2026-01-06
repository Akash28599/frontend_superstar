import './App.css';
import FooterLayout from './Components/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LayoutComponent } from './Layout';

function App() {
  const [settingsData, setSettingsData] = useState(null);
  useEffect(() => {
    const getFooterData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_STRAPI_URL}/api/sitesettings?populate=*`
        );
        const json = await res.json();
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
        <LayoutComponent settingsData={settingsData}/>
      </BrowserRouter>

      <FooterLayout settingsData={settingsData} />
    </div>
  );
}

export default App;