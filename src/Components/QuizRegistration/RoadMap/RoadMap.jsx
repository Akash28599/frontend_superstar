import './RoadMap.css'

const RoadMap = ({ data }) => {
    return (
        <section className='rm-roadmap-section'>
            <h2 className='rm-section-heading'>How It Works</h2>
            <div className='rm-roadmap-container'>
                <svg className='rm-roadmap-svg' viewBox="0 0 800 500" fill="none">
                    <path d="M400 100 H700 C780 100 780 380 700 380 H100" stroke="#D3D3D3" strokeWidth="5" strokeDasharray="15 15" />
                </svg>
                <div className='rm-step-row'>
                    <div className='rm-step-wrapper'>
                        <div className='rm-step-number-badge'>1</div>
                        <div className='rm-step-card-inner rm-border-bt-gold'>
                            <h4 className='rm-step-card-title'>{data.sections[0]?.title}</h4>
                            <p className='rm-step-card-desc'>{data.sections[0]?.description}</p>
                        </div>
                    </div>
                    <div className='rm-step-wrapper'>
                        <div className='rm-step-number-badge'>2</div>
                        <div className='rm-step-card-inner rm-border-bt-red'>
                            <h4 className='rm-step-card-title'>{data.sections[1]?.title}</h4>
                            <p className='rm-step-card-desc'>{data.sections[1]?.description}</p>
                        </div>
                    </div>
                </div>
                <div className='rm-step-row' style={{ justifyContent: 'flex-start', marginTop: '100px' }}>
                    <div className='rm-step-wrapper'>
                        <div className='rm-step-number-badge'>3</div>
                        <div className='rm-step-card-inner rm-border-bt-gold'>
                            <h4 className='rm-step-card-title'>{data.sections[2]?.title}</h4>
                            <p className='rm-step-card-desc'>{data.sections[2]?.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}
export default RoadMap