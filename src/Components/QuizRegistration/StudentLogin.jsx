import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const StudentLogin = ({ onClose }) => {
    const [loginForm, setLoginForm] = useState({ username: '', password: '' });
      const navigate = useNavigate();

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (loginForm.username && loginForm.password) {
            navigate('/exam-page');
        } else {
            alert("Please fill in both fields!");
        }
    };
    return (
        <div style={modalContent}>
            <button onClick={onClose} style={closeBtn}>×</button>
            <div style={modalIcon}>🔑</div>
            <h2 style={{ fontSize: '24px', margin: '0 0 5px', color: '#333' }}>Student Login</h2>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '25px' }}>Enter your details to start the quiz!</p>

            <form onSubmit={handleLoginSubmit} style={{ textAlign: 'left' }}>
                <div style={inputGroup}>
                    <label style={labelStyle}>Username</label>
                    <input
                        type="text"
                        placeholder="Your username"
                        style={inputStyle}
                        required
                        onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                    />
                </div>
                <div style={inputGroup}>
                    <label style={labelStyle}>Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        style={inputStyle}
                        required
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    />
                </div>
                <button type="submit" style={modalLoginBtn}>Login & Start Exam</button>
            </form>
        </div>
    )
}

const constants = { red: '#dd2120' ,fontFamily:'"KelloggsSans", Arial, sans-serif'}
const modalContent = { backgroundColor: '#fff', padding: '40px', borderRadius: '30px', width: '90%', maxWidth: '400px', textAlign: 'center', position: 'relative', animation: 'popIn 0.3s ease-out' };
const closeBtn = { position: 'absolute', top: '15px', right: '20px', fontSize: '28px', background: 'none', border: 'none', cursor: 'pointer', color: '#999' };
const modalIcon = { width: '70px', height: '70px', backgroundColor: '#ffcc00', borderRadius: '50%', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px' };
const inputGroup = { marginBottom: '15px', textAlign: 'left' };
const labelStyle = { display: 'block', fontWeight: '700', marginBottom: '5px', fontSize: '14px' };
const inputStyle = { width: '100%', padding: '12px', borderRadius: '10px', border: '2px solid #eee', outline: 'none', boxSizing: 'border-box' };
const modalLoginBtn = { width: '100%', padding: '15px', backgroundColor: constants.red, color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', marginTop: '10px' };
