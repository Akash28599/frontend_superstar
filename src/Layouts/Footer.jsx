import React from "react";
import SocialIcons from "../Components/SocialIcons/SocialIcons";


const FooterLayout = ({ settingsData }) => {
  const addressLines = settingsData?.address?.split("\n") ?? [];
  console.log(settingsData)
  return (
    <div className="w-full bg-kelloggs-red font-kelloggs text-white">
      {/* Main Content Area */}
      <div className="
        max-w-full sm:max-w-[1400px] mx-auto 
        px-4 py-8 xxs:px-5 xxs:py-9 sm:px-6 sm:py-10 tablet:px-12 tablet:py-16 wide:px-20 
        flex flex-col lg:flex-row 
        justify-between items-center lg:items-start 
        gap-6 sm:gap-8 lg:gap-10
      ">
        
        {/* Logo Section */}
        <div className="w-full lg:w-[25%] flex justify-center lg:justify-start">
          {settingsData?.logos?.[1]?.url ? (
            <img
              src={settingsData.logos?.[1].url}
              alt={settingsData.sitename}
              className="
                w-[234px] 
                h-auto object-cover 
                rounded-lg 
                bg-transparent
                md:-mt-6 md:-ml-5
              "
            />
          ) : (
            <div className="
              w-[180px] h-[180px] 
              bg-white/20 rounded-lg 
              flex items-center justify-center 
              text-white text-lg
            ">
              No Logo
            </div>
          )}
        </div>

        {/* Links Grid Section */}
        <div className="
            flex flex-col lg:flex-row flex-1 w-full 
            justify-between gap-10 tablet:gap-4 
            text-center lg:text-left
        ">
          
          {/* Company Column */}
          <div className="flex flex-col flex-1 gap-2">
            <h3 className="text-[20px] wide:text-[22px] font-bold mb-2">Company</h3>
            <ul className="text-[16px] wide:text-[18px] leading-[2.2] space-y-1">
              <li className="cursor-pointer hover:underline">About Us</li>
              <li className="cursor-pointer hover:underline">Our Blog</li>
              <li className="cursor-pointer hover:underline">Collaboration</li>
            </ul>
          </div>

          {/* More Info Column */}
          <div className="flex flex-col flex-1 gap-2">
            <h3 className="text-[20px] wide:text-[22px] font-bold mb-2">More Info</h3>
            <ul className="text-[16px] wide:text-[18px] leading-[2.2] space-y-1">
              <li className="cursor-pointer hover:underline">{settingsData?.contactphone}</li>
              <li className="cursor-pointer hover:underline">Privacy Policy</li>
              <li className="cursor-pointer hover:underline">Sitemap</li>
            </ul>
          </div>

          {/* Location Column */}
          <div className="flex flex-col flex-1 gap-2 text-center lg:text-left">
            <h3 className="text-[20px] wide:text-[22px] font-bold mb-2">Location</h3>
            <ul className="text-[16px] wide:text-[18px] leading-[2.2] space-y-1">
              <li>{settingsData?.contactemail ?? "—"}</li>
              <li>{addressLines[0] ?? "—"}</li>
              <li>{addressLines[1] ?? ""}</li>
            </ul>

            {/* Social Icons */}
            <div className="mt-6 flex justify-center lg:justify-start">
              <SocialIcons siteSettings={settingsData} />
            </div>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="
        bg-kelloggs-red 
        text-center py-6 px-4
        text-[16px] wide:text-[18px] 
        border-t border-white/20
        font-normal
      ">
        {settingsData?.copyright}
      </div>
    </div>
  );
};

export default FooterLayout;
