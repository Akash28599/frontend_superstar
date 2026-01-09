import './QuizCard.css'
const QuizCard = ({ data }) => {
    return (
        <div className="q-card-anim q-yellow-card">
            <div className='q-icon-box'>{data.icon}</div>
            <h3 className='q-card-title'>{data.title}</h3>
            <p className='q-card-desc'>{data.description}</p>
            <button onClick={data.onClick} className={data.isRedButton ? 'q-redbtn' : 'q-whitebtn'}>{data.buttonText}</button>
        </div>
    )

}
export default QuizCard