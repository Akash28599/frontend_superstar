import './QuizCard.css'
const QuizCard = ({ data }) => {
    return (
        <div className="qc-card-anim qc-yellow-card">
            <div className='qc-icon-box'>{data.icon}</div>
            <h3 className='qc-card-title'>{data.title}</h3>
            <p className='qc-card-desc'>{data.description}</p>
            <button onClick={data.onClick} className={data.isRedButton ? 'q-redbtn' : 'q-whitebtn'}>{data.buttonText}</button>
        </div>
    )

}
export default QuizCard