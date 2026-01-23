import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LayoutComponent } from './Layouts/Layout';
import { useAppStore } from './store/appStore';

function App() {
  const [scale, setScale] = useState(window.devicePixelRatio);

  const { siteSettings: settingsData, fetchSiteSettings } = useAppStore();

  useEffect(() => {
    const handleResize = () => {
      setScale(window.devicePixelRatio);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const is100PercentScale = scale === 1;

  useEffect(() => {
    fetchSiteSettings();
  }, [fetchSiteSettings]);

  return (
    <div className="App">
      <BrowserRouter>
        <LayoutComponent settingsData={settingsData} dpr={is100PercentScale} />
      </BrowserRouter>
    </div>
  );
}

export default App;
