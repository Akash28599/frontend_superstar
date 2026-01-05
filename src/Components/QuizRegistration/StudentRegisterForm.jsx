import { useState } from 'react';
import './StudentRegisterForm.css';
import { FaWpforms } from "react-icons/fa";
import RegistrationSuccessModal from './RegistrationSuccessModal';

const StudentForm = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="sr-container">
      <div className="sr-card">
        <div className="sr-header">
          <span className="sr-logo"><img src='/assetss/kelloggH1.png' /></span>
          <h1>Fill Your Details</h1>
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
            <button className="sr-upload"><FaWpforms />Upload Birth Certificate</button>
          </div>

          <h2>Student 2 Registration</h2>

          <div className="sr-grid">
            <input placeholder="Full Name" />
            <button className="sr-upload"><FaWpforms />Upload Birth Certificate</button>
          </div>

          <div className="sr-footer">
            <label>
              <input type="checkbox" /> I agree to the Terms & Conditions
            </label>

            <button
              className="sr-submit"
              onClick={() => setShowPopup(true)}
            >
              Submit Registration
            </button>
          </div>
        </div>
      </div>
      {showPopup && (
        <RegistrationSuccessModal
          onClose={() => setShowPopup(false)}
        />
      )}

    </div>
  );
};

export default StudentForm;
