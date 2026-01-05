import React from 'react'
import KelloggIcon from '../KelloggIcon/KelloggIcon'
import './AboutCompetition.css'
import SocialIcons from '../SocialIcons/SocialIcons';

const AboutCompetition = ({ data }) => {


    return (
        <div className='about-container'>
            <div className='about-left'>
                <div className="about-bg">
                    

                        <div className='bg-img' style={{ position: data?.shouldShowForm ? 'none' : 'absolute' }}>
                            <img src={data.bg?.url} className='img1' alt="background" />

                        </div> 
                        {!data?.shouldShowForm &&
                        <div className='abt-kg'>
                            <KelloggIcon IconImage={data?.IconImage?.url} isBlack={true} />

                        </div>}
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
                    {data.competitionDescription?.map((item, index) => (
                        <p key={index}>
                            <strong>{item.title}</strong>{` ${item.des}`}
                        </p>
                    ))}
                </div>

                <div className="about-steps">
                    {data.competitionSteps?.map((item, index) => (
                        <div className="about-step"
                            style={{ marginBottom: data.competitionSteps.length == index + 1 ? 'none' : '20px' }}
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
                <div className='abt-follow'>{data.socialLinkText}
                    {/* <div className='abt-social-media'>
                        <FaInstagram className='abt-social-icon ' onClick={() => openUrl(data.siteSettings?.instagramurl)} />
                        <FaTwitter className='abt-social-icon ' onClick={() => openUrl(data.siteSettings?.twitterurl)} />
                        <LuFacebook className='abt-social-icon ' onClick={() => openUrl(data.siteSettings?.facebookurl)} />
                    </div> */}
                    <SocialIcons siteSettings={data.siteSettings} />
                </div>

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
