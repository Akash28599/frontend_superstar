import './RegistrationSuccessModal.css';
import { FaCheckCircle } from 'react-icons/fa';

const RegistrationSuccessModal = ({ onClose }) => {
    return (
        <div className="rs-overlay">
            <div className="rs-modal">
                <div className="rs-header">
                    <div>
                        <img
                            src="/assetss/kelloggH1.png"
                            alt="Kellogg's"
                            className="rs-logo"
                        />
                        <h3>Superstars Quiz</h3>
                    </div>

                    <p>Test your knowledge, win big!</p>
                </div>

                <div className="rs-body">
                    <h1>Registration Successful!</h1>
                    <p className="rs-sub">Your school is all set!</p>

                    <FaCheckCircle className="rs-check" />

                    <h2>What Happens Next?</h2>

                    <ol>
                        <li>Check your school email.</li>
                        <li>
                            We’ve sent login details and exam times for your students.
                        </li>
                    </ol>
                    <button className="rs-btn" onClick={onClose}>
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegistrationSuccessModal;
