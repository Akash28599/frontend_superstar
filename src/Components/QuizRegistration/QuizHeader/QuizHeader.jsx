import './QuizHeader.css'
const QuizHeader=({data})=>{
    return(
        <header className='q-header'>
        <div className='q-header-inner'>
          <div className='q-header-text-container'>
            <h1 className='q-title'>{data.heading}</h1>
            <p className='q-subtitle'>{data.sub_heading}</p>
          </div>
          <div className='q-header-action-area'>
            <img src={data.first_component.daily_challenges.image} alt="Coco Head" className='q-coco-head-icon' />
            <div className='q-help-circle'>?</div>
          </div>
        </div>
      </header>
    )
}
export default QuizHeader