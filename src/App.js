import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LayoutComponent } from './Layouts/Layout';
import { API_CONFIG } from './common/config';

function App() {
  const [settingsData, setSettingsData] = useState(null);
  const [scale, setScale] = useState(window.devicePixelRatio);

  useEffect(() => {
    const handleResize = () => {
      setScale(window.devicePixelRatio);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const is100PercentScale = scale === 1;

  useEffect(() => {
    const getFooterData = async () => {
      try {
        const res = await fetch(
          `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.FOOTER}`
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
        <LayoutComponent settingsData={settingsData} dpr={is100PercentScale} />
      </BrowserRouter>

    </div>
  );
}

export default App;