import React from 'react'
import './KelloggIcon.css'
const KelloggIcon = ({ IconImage, isBlack }) => {


    return (
        <div className="brand">
            <img
                src='assetss/kelloggH1.png'
                alt="icon"
                className="brand-image"
                style={{ filter: isBlack ? 'invert(1)' : 'none' }}
            />
            <img
                src={IconImage}
                alt="icon"
                className="brand-image"

            />

            <div className="brand-title">Scholarship</div>

            <div className="prize-box"
                            style={{ filter: isBlack ? 'invert(1)' : 'none' }}
            >
                <div className="prize-amount">Win N150,000</div>
                <div className="prize-sub">as educational expense</div>
            </div>
        </div>
    )
}

export default KelloggIcon