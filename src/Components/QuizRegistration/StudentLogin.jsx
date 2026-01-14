import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './StudentLogin.css';
import RedButton from "../RedButton";

export const StudentLogin = ({ onClose }) => {
    const [loginForm, setLoginForm] = useState({ username: '', password: '' });
      const navigate = useNavigate();

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (loginForm.username && loginForm.password) {
            navigate('/instructions');
        } else {
            alert("Please fill in both fields!");
        }
    };
    return (
        <div className="sl-container">
            <button onClick={onClose} className="sl-close">×</button>
            <div className="sl-icon">🔑</div>
            <h2 className="sl-title">Student Login</h2>
            <p className="sl-desc">Enter your details to start the quiz!</p>

            <form onSubmit={handleLoginSubmit} className="sl-form">
                <div className="sl-group">
                    <label className="sl-label">Username</label>
                    <input
                        type="text"
                        placeholder="Your username"
                        className="sl-input"
                        required
                        onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                    />
                </div>
                <div className="sl-group">
                    <label className="sl-label">Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className="sl-input"
                        required
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    />
                </div>
                <RedButton buttonText='Login & Start Exam' buttonStyle={'w-full py-3 mt-3'}/>
            </form>
        </div>
    )
}
