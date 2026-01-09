import { useEffect, useState } from 'react';
import { StudentLogin } from './StudentLoginPopup/StudentLogin';
import StudentRegister from './StudentRegisterForm';
import './QuizLandingPage.css'
import QuizHeader from './QuizHeader/QuizHeader';
import QuizCardContainer from './QuizCards/QuizCardContainer';
import RoadMap from './RoadMap/RoadMap';
import QuizWaitList from './QuizWaitList/QuizWaitList';
const QuizLandingPage = () => {
  const [pageData, setPageData] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_STRAPI_URL}/api/quiz-landing-page`)
      .then((res) => res.json())
      .then((json) => setPageData(json.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

 
  if (!pageData) return <div className='q-loading'>Loading...</div>;

  const { heading, sub_heading, first_component, second_component } = pageData;

  return (
    <div className='q-container'>

      {showLogin && (
        <div className='q-modal-overlay'>
          <StudentLogin onClose={() => setShowLogin(false)} />
        </div>
      )}
      {showRegister && (
        <div className='q-modal-overlay'>
          <StudentRegister onClose={() => setShowRegister(false)} />
        </div>
      )}

      <img
        src={first_component.student_exam_login.image}
        alt="Coco"
        className='q-coco'
      />
      <QuizHeader data={{ heading, sub_heading, first_component }} />

      <main className='q-main-content'>
        <QuizCardContainer data={{ first_component, setShowLogin, setShowRegister }} />


        <RoadMap data={second_component} />
        <QuizWaitList/>
      </main >
    </div >
  );
};


export default QuizLandingPage;