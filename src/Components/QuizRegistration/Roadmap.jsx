import { COLORS } from '../../common/config';

const Roadmap = ({ data }) => {
    return (
        <section className='mt-0 text-center relative'>
            <h2 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold text-[#333] mb-12 md:mb-20">How to Participate</h2>
            <div className="relative max-w-full md:max-w-[900px] mx-auto">
                {/* SVG Path - Hidden on mobile */}
                <svg className="hidden md:block absolute top-0 left-0 w-full h-full z-0" viewBox="0 0 800 500" fill="none">
                    <path d="M400 100 H700 C780 100 780 380 700 380 H100" stroke="#D3D3D3" strokeWidth="5" strokeDasharray="15 15" />
                </svg>

                {/* Steps - Stacked on mobile, side-by-side on desktop */}
                <div className="flex flex-col md:flex-row md:justify-between relative z-1 gap-6 md:gap-0">
                    <div className="step-card flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-5 md:w-[45%]">
                        <div className={stepNumberBadge}>1</div>
                        <div className={stepCardInner} style={{ borderBottom: `8px solid ${COLORS.gold}` }}>
                            <h4 className={stepCardTitle}>{data.second_component?.sections?.[0]?.title}</h4>
                            <p className={stepCardDesc}>{data.second_component?.sections?.[0]?.description}</p>
                        </div>
                    </div>
                    <div className="step-card flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-5 md:w-[45%]">
                        <div className={stepNumberBadge}>2</div>
                        <div className={stepCardInner} style={{ borderBottom: `8px solid ${COLORS.red}` }}>
                            <h4 className={stepCardTitle}>{data.second_component?.sections?.[1]?.title}</h4>
                            <p className={stepCardDesc}>{data.second_component?.sections?.[1]?.description}</p>
                        </div>
                    </div>
                </div>

                <div className="flex font-size flex-col md:flex-row md:justify-start mt-6 md:mt-[100px] relative z-1">
                    <div className="step-card flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-5 md:w-[45%]">
                        <div className={stepNumberBadge}>3</div>
                        <div className={stepCardInner} style={{ borderBottom: `8px solid ${COLORS.gold}` }}>
                            <h4 className={stepCardTitle}>{data.second_component?.sections?.[2]?.title}</h4>
                            <p className={stepCardDesc}>{data.second_component?.sections?.[2]?.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Roadmap

const stepNumberBadge = `size-[55px] rounded-[50%] bg-kelloggs-gold text-[#fff] flex items-center justify-center text-[24px] font-extrabold shrink-0 shadow-[0 6px 15px rgba(255,204,0,0.3)]`
const stepCardInner= `bg-white p-[25px] rounded-r-[20px] text-left shadow-[0 12px 30px rgba(0,0,0,0.06)] flex-1`
const stepCardTitle = `m-[0 0 8px] text-[20px] font-bold text-[#333]`
const stepCardDesc = ` m-0 text-[14px]/[1.5] text-[#666]`