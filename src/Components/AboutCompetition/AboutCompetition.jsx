import React from 'react'
import KelloggIcon from '../KelloggIcon/KelloggIcon'
import './AboutCompetition.css'
const AboutCompetition = ({ data }) => {
    return (
        <div className='about-container'>
            {!data.shouldShowForm && <KelloggIcon IconImage={data.IconImage}/>}
            <div className='about-right'>
                    <h1>{data.competitionTitle}</h1>
                    <h4>{data.CompetitionDescription}</h4>
            </div>
        </div>
    )
}

export default AboutCompetition