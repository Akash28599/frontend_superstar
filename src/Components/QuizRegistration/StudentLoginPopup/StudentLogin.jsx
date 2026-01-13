import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './StudentLogin.css'
 const StudentLogin = ({ onClose }) => {
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
        <div className="sl-modal-content">
            <button onClick={onClose} className="sl-closebtn">×</button>
            <div className="sl-modal-icon">🔑</div>
            <h2>Student Login</h2>
            <p>Enter your details to start the quiz!</p>

            <form onSubmit={handleLoginSubmit} style={{ textAlign: 'left' }}>
                <div className='sl-input-group'>
                    <label className='sl-label'>Username</label>
                    <input
                        type="text"
                        placeholder="Your username"
                        className='sl-input'
                        required
                        onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                    />
                </div>
                <div className='sl-input-group'>
                    <label className='sl-label'>Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className='sl-input'
                        required
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    />
                </div>
                <button type="submit" className='sl-modal-loginbtn'>Login & Start Exam</button>
            </form>
        </div>
    )
}
export default StudentLogin