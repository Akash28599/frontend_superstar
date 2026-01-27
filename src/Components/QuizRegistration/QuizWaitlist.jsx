import { useState } from 'react';
import { COLORS, FONTS } from '../../common/config';

const QuizWaitlist = ({ data }) => {
        const [waitlistEmail, setWaitlistEmail] = useState('');
    
    const handleWaitlistSubmit = (e) => {
        e.preventDefault();
        alert(`Success! ${waitlistEmail} has been added to the waitlist.`);
        setWaitlistEmail('');
    };
    return (
        <section className="my-16 md:my-[120px] p-8 md:p-[60px] bg-[#fff7d6ff] rounded-3xl md:rounded-[40px] text-center">
            <div className="max-w-full md:max-w-[800px] mx-auto flex flex-col items-center gap-6 md:gap-[30px]">
                <div className="text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-[32px] font-extrabold text-[#333] mb-2 md:mb-[10px]">{data.third_component.wishlist_section.title}</h2>
                    <p className="text-sm sm:text-base md:text-lg text-[#666] max-w-full md:max-w-[600px] mx-auto leading-[1.6]">
                        {data.third_component.wishlist_section.description}
                    </p>
                </div>
                <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-3 md:gap-[10px] w-full max-w-full md:max-w-[500px]">
                    <input
                        type="email"
                        placeholder={data.third_component.wishlist_section.input_text}
                        className="flex-1 sm:flex-[2] p-3 md:p-4 rounded-xl md:rounded-[15px] border-2 outline-none text-sm md:text-base"
                        style={{ borderColor: COLORS.gold, fontFamily: FONTS.primary }}
                        required
                        value={waitlistEmail}
                        onChange={(e) => setWaitlistEmail(e.target.value)}
                    />
                    <button type="submit" className="px-6 py-3 md:py-4 text-sm md:text-base" style={redBtn}>{data.third_component.wishlist_section.button_text}</button>
                </form>
            </div>
        </section>
    )
}
export default QuizWaitlist

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
