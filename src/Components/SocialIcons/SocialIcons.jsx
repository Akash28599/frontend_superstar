import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { LuFacebook } from "react-icons/lu";
import { openUrl } from '../../Utils/Utilities';
import React from 'react';

const SocialIcons = ({ siteSettings }) => {

    const iconClass = "w-[30px] h-[30px] p-[5px] bg-white border border-white rounded-md text-black cursor-pointer hover:scale-110 transition-transform box-content";

    const getSocialIcon = (type) => {
        switch (type) {
            case "twitterurl":
                return <FaTwitter className={iconClass} onClick={() => openUrl(siteSettings?.twitterurl)} />;
            case "facebookurl":
                return <LuFacebook className={iconClass} onClick={() => openUrl(siteSettings?.facebookurl)} />;
            case "instagramurl":
                return <FaInstagram className={iconClass} onClick={() => openUrl(siteSettings?.instagramurl)} />;
            case "youtubeurl":
                return <FaYoutube className={iconClass} onClick={() => openUrl(siteSettings?.youtubeurl)} />;
            case "tiktokurl":
                return <FaTiktok className={iconClass} onClick={() => openUrl(siteSettings?.tiktokurl)} />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-row gap-3 items-center">
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