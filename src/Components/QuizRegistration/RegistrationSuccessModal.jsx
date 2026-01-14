import RedButton from '../RedButton';
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
                    <h1>Congratulations! Your Registration is Complete!</h1>
                    <p className="rs-sub">Check your mail for next steps.</p>

                    <FaCheckCircle className="rs-check" />
                    <RedButton buttonStyle={'py-2 px-6'} onClick={onClose} buttonText='Back'/>
                </div>
            </div>
        </div>
    );
};

export default RegistrationSuccessModal;
