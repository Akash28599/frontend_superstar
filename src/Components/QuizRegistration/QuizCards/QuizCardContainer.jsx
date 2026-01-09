import QuizCard from './QuizCard'
import './QuizCardContainer.css'
const QuizCardContainer = ({ data }) => {
    return (
        <div className='q-card-row'>
            <QuizCard data={{ icon: '🏆', title: data.first_component.daily_challenges.title, description: data.first_component.daily_challenges.description, buttonText: 'Start Daily Quiz' }} />
            <QuizCard data={{ isRedButton: true, icon: '⭐', title: data.first_component.school_registration.title, description: data.first_component.school_registration.description, buttonText: 'Register Now', onClick: () => data.setShowRegister(true) }} />
            <QuizCard data={{ isRedButton: true, icon: '🔑', title: data.first_component.student_exam_login.title, description: data.first_component.student_exam_login.description, buttonText: 'Start Exam', onClick: () => data.setShowLogin(true) }} />
        </div>
    )

}
export default QuizCardContainer