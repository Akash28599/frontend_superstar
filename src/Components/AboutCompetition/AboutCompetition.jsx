import React from 'react'
import KelloggIcon from '../KelloggIcon/KelloggIcon'
import './AboutCompetition.css'
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { LuFacebook } from "react-icons/lu";

const AboutCompetition = ({ data }) => {
    return (
        <div className='about-container'>
            <div className='about-left'>
                <div className="about-bg">
                    <img src={data.bg} className='img1' alt="background" />
                    {!data?.shouldShowForm && (
                        <KelloggIcon IconImage={data?.IconImage} />
                    )}
                </div>

                <img
                    src={data.groupKellogs2?.url}
                    alt='group'
                    className='img2'
                />
            </div>

            <div className='about-right'>
                <h1>{data.competitionTitle}</h1>

                <div className='about-right-para'>
                    {data.CompetitionDescription?.map((item, index) => (
                        <p key={index}>
                            <strong>{item.title}</strong>{` ${item.des}`}
                        </p>
                    ))}
                </div>

                <div className="about-steps">
                    {data.CompetitionSteps?.map((item, index) => (
                        <div className="about-step"
                            style={{ marginBottom: data.CompetitionSteps.length == index + 1 ? 'none' : '20px' }}
                            key={index}>
                            <span className="about-step-dot" />
                            <div className="about-step-content">
                                <p className="step-text"><strong className="step-label">
                                    {`Step ${index + 1}: `}</strong>{item}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='abt-follow'>Follow us and stay tuned.<div className='abt-social-media'><FaInstagram className='abt-social-icon ' /><FaTwitter className='abt-social-icon ' /><LuFacebook className='abt-social-icon ' /></div></div>

                <div className='about-crit'>    
                    <h1>Criteria for Selection</h1>
                    <div className='abt-crit-cont'>
                        {data.criteria?.map((item) =>
                            <div className='abt-criteria'>{item}</div>
                        )}
                    </div>

                </div>

            </div>
        </div>
    )
}

export default AboutCompetition
