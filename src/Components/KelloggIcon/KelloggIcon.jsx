import React from 'react'
import './KelloggIcon.css'
const KelloggIcon = ({ IconImage, isBlack }) => {

    const redCode = '#dd2120'
    return (
        <div className="brand">
            {/* Logo Container - Matching ref dimensions */}
            <div className="relative w-[280px] h-[280px] flex flex-col items-center justify-center">
                 {/* 1. Kellogg's Script Logo (White Mask) */}
                <div
                    style={{
                        position: 'absolute',
                        top: '0',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '100%',
                        height: '120px',
                        backgroundColor: isBlack ? redCode : 'white',
                        WebkitMaskImage: `url(/assetss/kelloggH1.png)`,
                        WebkitMaskRepeat: 'no-repeat',
                        WebkitMaskSize: 'contain',
                        WebkitMaskPosition: 'center',
                        maskImage: `url(/assetss/kelloggH1.png)`,
                        maskRepeat: 'no-repeat',
                        maskSize: 'contain',
                        maskPosition: 'center',
                        zIndex: 1
                    }}
                />

                {/* 2. Super Stars Badge Icon */}
                <img
                    src="https://kelloggsnigeria.ng/_nuxt/img/super-stars.a47ecf0.png"
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