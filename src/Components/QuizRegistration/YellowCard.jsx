import { COLORS, FONTS } from '../../common/config';
import { MdVpnKey } from "react-icons/md";
import { MdOutlineStarPurple500 } from "react-icons/md";

const YellowCard = ({ data, setShowLogin, setShowRegister }) => {
    return (
        <>
            <div className="flex flex-col md:flex-row gap-6 md:gap-[25px] justify-center mb-16 md:mb-20 mt-12 md:mt-20">
                <div className={`card-anim w-full md:max-w-[400px] p-8 md:p-10 flex flex-col ${yellowCardStyle}`}>
                    <div className={iconBox}>
                        <MdOutlineStarPurple500 className='text-kelloggs-red' />
                    </div>
                    <h3 className="text-lg md:text-[22px] font-extrabold mb-2 md:mb-[10px] text-[#333]">{data.first_component.school_registration.title}</h3>
                    <p className="text-sm md:text-base text-[#444] leading-[1.4] mb-6 md:mb-[25px] flex-1">
                        {data.first_component.school_registration.description}
                    </p>
                    <button
                        className="w-full"
                        style={redBtn}
                        onClick={() => setShowRegister(true)}
                    >
                        {data.first_component.school_registration.button_text}
                    </button>
                </div>

                <div className={`card-anim w-full md:max-w-[400px] p-8 md:p-10 flex flex-col ${yellowCardStyle}`}>
                    <div className={iconBox}>
                        {/* <svg width="34" height="34" viewBox="0 0 24 24" fill={COLORS.red}>
                <path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
              </svg> */}
                        <MdVpnKey className='text-kelloggs-red' />
                    </div>
                    <h3 className="text-lg md:text-[22px] font-extrabold mb-2 md:mb-[10px] text-[#333]">{data.first_component.student_exam_login.title}</h3>
                    <p className="text-sm md:text-base text-[#444] leading-[1.4] mb-6 md:mb-[25px] flex-1">
                        {data.first_component.student_exam_login.description}
                    </p>
                    <button className="w-full" style={redBtn} onClick={() => setShowLogin(true)}>
                        {data.first_component.student_exam_login.button_text}
                    </button>
                </div>
            </div>
        </>

    );
}
export default YellowCard;

const iconBox="bg-white w-16 h-16 rounded-[20px] mx-auto mb-[15px] flex items-center justify-center text-[34px] shadow-[0_4px_10px_rgba(0,0,0,0.1)]"

const yellowCardStyle ="bg-kelloggs-gold rounded-[30px] text-center shadow-[0_8px_25px_rgba(0,0,0,0.08)]"

const redBtn = {
    backgroundColor: COLORS.red,
    color: '#fff',
    border: 'none',
    padding: '14px',
    borderRadius: '12px',
    fontWeight: '700',
    cursor: 'pointer',
    fontFamily: FONTS.primary
};
