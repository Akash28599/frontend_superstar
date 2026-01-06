import { useState } from 'react';
import { FaWpforms } from "react-icons/fa";
import { HiIdentification } from "react-icons/hi2";
import RegistrationSuccessModal from './RegistrationSuccessModal';
import { useNavigate } from 'react-router-dom';
import './StudentRegisterForm.css'

const StudentForm = ({ onClose }) => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate()

  return (

    <div className="sr-container">

      <div className="sr-card">

        <div className="sr-header">
          <span className="sr-logo"><img src='/assetss/kelloggH1.png' /></span>
          <div>
            <h1>Fill Your Details</h1>
            <button onClick={onClose} className="sr-btn">×</button>

          </div>
        </div>
        <div className="sr-body">
          <h2>School Details</h2>

          <div className="sr-grid">
            <input placeholder="School Name" />
            <input placeholder="School Email" />
            <input placeholder="School Contact Number" />
            <input placeholder="School Address" />
          </div>

          <h2>Student 1 Registration</h2>

          <div className="sr-grid">
            <input placeholder="Full Name" />
            <label className="sr-upload">
              <FaWpforms />
              Upload Birth Certificate
              <input
                type="file"
                hidden
                accept=".jpg,.jpeg,.png,.pdf"
              />
            </label>
            <label className="sr-upload">
              <HiIdentification />
              Upload School ID Card
              <input
                type="file"
                hidden
                accept=".jpg,.jpeg,.png,.pdf"
              />
            </label>
          </div>

          <h2>Student 2 Registration</h2>

          <div className="sr-grid">
            <input placeholder="Full Name" />
            <label className="sr-upload">
              <FaWpforms />
              Upload Birth Certificate
              <input
                type="file"
                hidden
                accept=".jpg,.jpeg,.png,.pdf"
              />
            </label>
            <label className="sr-upload">
              <HiIdentification />
              Upload School ID Card
              <input
                type="file"
                hidden
                accept=".jpg,.jpeg,.png,.pdf"
              />
            </label>
          </div>

          <div className="sr-footer">
            <label>
              <input type="checkbox" /> I agree to the Terms & Conditions
            </label>

            <button
              className="sr-submit"
              onClick={() => {
                setShowPopup(true)

              }}
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

export default StudentForm;
