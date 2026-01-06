import { useState } from 'react';
import { FaWpforms } from "react-icons/fa";
// import { HiIdentification } from "react-icons/hi2";
import RegistrationSuccessModal from './RegistrationSuccessModal';
import { useNavigate } from 'react-router-dom';
import './StudentRegisterForm.css'

const studentStruct = {
  fullName: '',
  birthCertificate: '',
}
const StudentRegister = ({ onClose }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    schoolName: '',
    schoolEmail: '',
    schoolContact: '',
    schoolAddress: '',
    student1: studentStruct,
    student2: studentStruct
  })
  const navigate = useNavigate()
  const handleRegistraion = (e) => {
    e.preventDefault();
    if (true) {
      setShowPopup(true)
    } else {
      alert("Please fill in both fields!");
    }
  }
  return (

    <div className="sr-container">

      <div className="sr-card">

        <div className="sr-header">
          <span className="sr-logo"><img src='/assetss/kelloggH1.png' alt="Kellogg's" /></span>
          <div>
            <h1>Fill Your Details</h1>
            <button onClick={onClose} className="sr-btn">×</button>

          </div>
        </div>
        <div className="sr-body">
          <h2>School Details</h2>

          <div className="sr-grid">
            <input required placeholder="School Name" />
            <input required placeholder="School Email" />
            <input required placeholder="School Contact Number" />
            <input required placeholder="School Address" />
          </div>

          <h2>Student 1 Registration</h2>

          <div className="sr-grid">
            <input required placeholder="Full Name" />
            <label className="sr-upload">
              <FaWpforms />
              Upload Birth Certificate
              <input required
                type="file"
                hidden
                accept=".jpg,.jpeg,.png,.pdf"
              />
            </label>
            {/* <label className="sr-upload">
              <HiIdentification />
              Upload School ID Card
              <input
                type="file"
                hidden
                accept=".jpg,.jpeg,.png,.pdf"
              />
            </label> */}
          </div>

          <h2>Student 2 Registration</h2>

          <div className="sr-grid">
            <input required placeholder="Full Name" />
            <label className="sr-upload">
              <FaWpforms />
              Upload Birth Certificate
              <input required
                type="file"
                hidden
                accept=".jpg,.jpeg,.png,.pdf"
              />
            </label>
            {/* <label className="sr-upload">
              <HiIdentification />
              Upload School ID Card
              <input required
                type="file"
                hidden
                accept=".jpg,.jpeg,.png,.pdf"
              />
            </label> */}
          </div>

          <div className="sr-footer">
            <label>
              <input required type="checkbox" /> I agree to the Terms & Conditions
            </label>

            <button
              className="sr-submit"
              onClick={handleRegistraion}
            >
              Submit Registration
            </button>
          </div>
        </div>
      </div>
      {showPopup && (
        <RegistrationSuccessModal
          onClose={() => {
            setShowPopup(false);
            window.scrollTo({ top: 0, behavior: 'instant' })
            onClose()

            navigate('/quiz')
          }}
        />
      )}

    </div>


  );
};

export default StudentRegister;
