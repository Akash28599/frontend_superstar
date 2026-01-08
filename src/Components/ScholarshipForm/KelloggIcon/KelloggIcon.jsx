import React from 'react'
import './KelloggIcon.css'
const KelloggIcon = ({ IconImage, isBlack }) => {

    const redCode = '#dd2120'
    return (
        <div className="brand">
            <div
                style={{
                    width: '80%',
                    height: '150px',
                    backgroundColor: isBlack ? redCode : 'white',
                    WebkitMaskImage: `url(assetss/kelloggH1.png)`,
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskSize: 'contain',
                    maskImage: `url(assetss/kelloggH1.png)`,
                    maskRepeat: 'no-repeat',
                    maskSize: 'contain',

                }}
            />
            {/* <img
                src='assetss/kelloggH1.png'
                alt="icon"
                className="brand-image"
            /> */}
            <img
                src={IconImage}
                alt="icon"
                className="brand-image"

            />

            <div className="brand-title" style={{ color: isBlack ? redCode : 'white' }}>Scholarship</div>

            <div className="prize-box"
                style={{
                    color: isBlack ? redCode : 'white',
                    border: `2px solid ${isBlack ? redCode : 'white'}`

                }}
            >
                <div className="prize-amount">Win N150,000</div>
                <div className="prize-sub">as educational expense</div>
            </div>
        </div>
    )
}

export default KelloggIcon