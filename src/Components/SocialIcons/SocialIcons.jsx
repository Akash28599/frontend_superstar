import './SocialIcons.css'
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { LuFacebook } from "react-icons/lu";
import { openUrl } from '../../Utils/Utilities';
import React from 'react';
const SocialIcons = ({ siteSettings }) => {

    const getSocialIcon = (type) => {
        switch (type) {

            case "twitterurl":
                return <FaTwitter className='abt-social-icon' onClick={() => openUrl(siteSettings?.twitterurl)} />;
            case "facebookurl":
                return <LuFacebook className='abt-social-icon' onClick={() => openUrl(siteSettings?.facebookurl)} />;
            case "instagramurl":
                return <FaInstagram className='abt-social-icon' onClick={() => openUrl(siteSettings?.instagramurl)} />;
            case "youtubeurl":
                return <FaYoutube className='abt-social-icon' onClick={() => openUrl(siteSettings?.youtubeurl)} />;
            case "tiktokurl":
                return <FaTiktok className='abt-social-icon' onClick={() => openUrl(siteSettings?.tiktokurl)} />;
            default:
                return null; // unknown icon safe guard
        }
    };

    return (

        <div>
            {Object.entries(siteSettings || {}).map(([type], index) => {
                const Icon = getSocialIcon(type);
                if (!Icon) return null;

                return (
                    <React.Fragment key={type + index}>
                        {Icon}
                    </React.Fragment>
                );
            })}

        </div>
    )
}
export default SocialIcons