import './RoadMap.css'

const RoadMap = ({ data }) => {
    const constants = { gold: '#FBCA05', red: '#dd2120' }

    return (
        <section className='q-roadmap-section'>
            <h2 className='q-section-heading'>How It Works</h2>
            <div className='q-roadmap-container'>
                <svg className='q-roadmap-svg' viewBox="0 0 800 500" fill="none">
                    <path d="M400 100 H700 C780 100 780 380 700 380 H100" stroke="#D3D3D3" strokeWidth="5" strokeDasharray="15 15" />
                </svg>
                <div className='q-step-row'>
                    <div className='q-step-wrapper'>
                        <div className='q-step-number-badge'>1</div>
                        <div className='q-step-card-inner' style={{ borderBottom: `8px solid ${constants.gold}` }}>
                            <h4 className='q-step-card-title'>{data.sections[0]?.title}</h4>
                            <p className='q-step-card-desc'>{data.sections[0]?.description}</p>
                        </div>
                    </div>
                    <div className='q-step-wrapper'>
                        <div className='q-step-number-badge'>2</div>
                        <div className='q-step-card-inner' style={{ borderBottom: `8px solid ${constants.red}` }}>
                            <h4 className='q-step-card-title'>{data.sections[1]?.title}</h4>
                            <p className='q-step-card-desc'>{data.sections[1]?.description}</p>
                        </div>
                    </div>
                </div>
                <div className='q-step-row' style={{ justifyContent: 'flex-start', marginTop: '100px' }}>
                    <div className='q-step-wrapper'>
                        <div className='q-step-number-badge'>3</div>
                        <div className='q-step-card-inner' style={{ borderBottom: `8px solid ${constants.gold}` }}>
                            <h4 className='q-step-card-title'>{data.sections[2]?.title}</h4>
                            <p className='q-step-card-desc'>{data.sections[2]?.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}
export default RoadMap