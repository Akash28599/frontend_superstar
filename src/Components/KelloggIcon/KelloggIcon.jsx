import React from 'react'
import './KelloggIcon.css'
const KelloggIcon = ({IconImage}) => {
    return (
        <div className="brand">
            <img
                src={IconImage?.url}
                alt="icon"
                className="brand-image"
            />

            <div className="brand-title">Scholarship</div>

            <div className="prize-box">
                <div className="prize-amount">Win N150,000</div>
                <div className="prize-sub">as educational expense</div>
            </div>
        </div>
    )
}

export default KelloggIcon