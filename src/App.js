import logo from './logo.svg';
import './App.css';
import HomePage from './Pages/HomePage';
import ScholarshipPage from './Pages/ScholarshipPage';
import FooterLayout from './Components/Footer';
import Navbar from "./Components/Navbar"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/scholarship' element={<ScholarshipPage />} />
        </Routes>
      </BrowserRouter>

      <FooterLayout />
    </div>
  );
}

export default App;
