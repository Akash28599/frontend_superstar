import { useState } from 'react';
import { FaWpforms } from "react-icons/fa";
// import { HiIdentification } from "react-icons/hi2";
import RegistrationSuccessModal from './RegistrationSuccessModal';
import { useNavigate } from 'react-router-dom';
import './StudentRegisterForm.css'
import RedButton from '../RedButton';

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
  const handleFileChange = (e, studentKey, fieldKey) => {
    const file = e.target.files[0];
    if (file) {
      setRegisterForm(prev => ({
        ...prev,
        [studentKey]: {
          ...prev[studentKey],
          [fieldKey]: file
        }
      }));
    }
  };

  const handleFileRemove = (studentKey, fieldKey) => {
    setRegisterForm(prev => ({
      ...prev,
      [studentKey]: {
        ...prev[studentKey],
        [fieldKey]: ''
      }
    }));
  };

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
          <p style={{ fontSize: '14px', lineHeight: '1.5', color: '#555', marginBottom: '20px' }}>
            Welcome! Please complete all sections below accurately to register your school for consideration in the next season of the Kellogg's Superstars Quiz Show. Please note that registration does not guarantee participation in the show; qualified schools will be contacted for the final selection process. <br /><br />
            <strong>Please note this Show is exclusively for junior kids category between the ages of 8-11 from Primary 5 to JSS1</strong>
          </p>
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
            <div>
              <label className="sr-upload">
                <FaWpforms />
                {registerForm.student1.birthCertificate ? "Change File" : "Upload Birth Certificate"}
                <input required={!registerForm.student1.birthCertificate}
                  type="file"
                  hidden
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) => handleFileChange(e, 'student1', 'birthCertificate')}
                />
              </label>
              {registerForm.student1.birthCertificate && (
                <div style={{ fontSize: '0.85rem', color: '#d20640', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '5px', flexWrap: 'wrap' }}>
                  <span>✅ Upload Successful: <strong>{registerForm.student1.birthCertificate.name}</strong></span>
                  <button 
                    type="button"
                    onClick={() => handleFileRemove('student1', 'birthCertificate')}
                    style={{ 
                        cursor: 'pointer', 
                        color: '#fff', 
                        backgroundColor: '#d20640', 
                        border: 'none',
                        padding: '4px 10px', 
                        borderRadius: '4px', 
                        fontSize: '0.75rem',
                        marginLeft: 'auto'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
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
            <div>
              <label className="sr-upload">
                <FaWpforms />
                {registerForm.student2.birthCertificate ? "Change File" : "Upload Birth Certificate"}
                <input required={!registerForm.student2.birthCertificate}
                  type="file"
                  hidden
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) => handleFileChange(e, 'student2', 'birthCertificate')}
                />
              </label>
              {registerForm.student2.birthCertificate && (
                <div style={{ fontSize: '0.85rem', color: '#d20640', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '5px', flexWrap: 'wrap' }}>
                  <span>✅ Upload Successful: <strong>{registerForm.student2.birthCertificate.name}</strong></span>
                   <button 
                    type="button"
                    onClick={() => handleFileRemove('student2', 'birthCertificate')}
                    style={{ 
                        cursor: 'pointer', 
                        color: '#fff', 
                        backgroundColor: '#d20640', 
                        border: 'none',
                        padding: '4px 10px', 
                        borderRadius: '4px', 
                        fontSize: '0.75rem',
                        marginLeft: 'auto'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
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
             <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px', textAlign: 'center' }}>
              By submitting this form, I declare that the information provided is accurate and that I am authorized to represent the above-named school in the Kellogg’s Superstars Quiz Show registration process.
            </p>
            <label>
              <input required type="checkbox" /> I agree to the Terms & Conditions
            </label>
            <RedButton buttonStyle={'py-2'} onClick={handleRegistraion} buttonText='Submit Registration'/>
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
