import './App.css';
import FooterLayout from './Components/Footer';
import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LayoutComponent } from './Layout';

function App() {
  const [settingsData, setSettingsData] = useState(null);
  const [dpr, setDpr] = useState(window.devicePixelRatio || 1);

  useEffect(() => {
    const updateDpr = () => setDpr(window.devicePixelRatio || 1);
    window.addEventListener("resize", updateDpr);
    return () => window.removeEventListener("resize", updateDpr);
  }, []);

  useEffect(() => {
    const getFooterData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_STRAPI_URL}/api/sitesettings?populate=*`
        );
        const json = await res.json();
        setSettingsData(json?.data?.[0]);
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };
    getFooterData();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <LayoutComponent settingsData={settingsData} dpr={dpr}/>
      </BrowserRouter>

      <FooterLayout settingsData={settingsData} />
    </div>
  );
}

export default App;