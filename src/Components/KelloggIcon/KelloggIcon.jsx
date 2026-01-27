import React from 'react'
import './KelloggIcon.css'
const KelloggIcon = ({ isBlack,data }) => {
    console.log(data)
    const redCode = '#dd2120'
    return (
        <div className="brand">
            {/* Logo Container - Matching ref dimensions */}
            <div className="relative w-[280px] h-[280px] flex flex-col items-center justify-center">
                <img
                    src={isBlack?data?.logos?.[0]?.url:data?.logos?.[1]?.url}
                    alt="icon"
                    className="brand-image relative z-10"
                    style={{ 
                        marginTop: '95px', 
                        width: '65%',
                        height: 'auto',
                        objectFit: 'contain'
                    }}
                />
            </div>

            <div className="brand-title" style={{ color: isBlack ? redCode : 'white', marginTop: '-10px' }}>Scholarship</div>

            <div className="prize-box mt-4"
                style={{
                    color: isBlack ? redCode : 'white',
                    border: `2px solid ${isBlack ? redCode : 'white'}`,
                    padding: '8px 24px',
                    textAlign: 'center'
                }}
            >
                <div className="prize-amount leading-none mb-1">Win <span style={{ color: '#FBCA05' }}>N150,000</span></div>
                <div className="prize-sub leading-none">as educational expense</div>
            </div>
        </div>
    )
}

export default KelloggIcon