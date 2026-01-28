import { useEffect, useState } from 'react';
import { API_CONFIG } from '../../../common/config';

export const CocoHead = () => {
    const [items, setItems] = useState([]);
    const [head, setHead] = useState(null);

    useEffect(() => {
        fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COCO_HEADS}`)
            .then(res => res.json())
            .then(json => {
                const data = json.data || [];
                const headItem = data.find(d => d.thumbnail);
                const iconItems = data.filter(d => d.icon_description && d.icon_description.title);

                setHead(headItem || null);
                setItems(iconItems);
            })
            .catch(() => {});
    }, []);

    return (
        <div className="relative flex flex-col items-center justify-center w-full mt-12 md:mt-16 lg:mt-20 mb-12 md:mb-16 lg:mb-20 px-4 md:px-8 lg:px-[5%] gap-4 font-kelloggs overflow-visible">
            
            {/* Yellow Banner - Fully Responsive with extra padding to prevent clipping */}
            <div className="
                relative bg-kelloggs-gold 
                w-full max-w-[95%] md:max-w-[92%] lg:max-w-[90%] xl:max-w-[1400px]
                min-h-[320px] sm:min-h-[340px] md:min-h-[280px] lg:min-h-[300px]
                rounded-2xl md:rounded-3xl lg:rounded-[32px]
                p-6 sm:p-7 md:p-8 lg:p-10
                flex flex-col md:flex-row items-center 
                ml-0 md:ml-[5%] lg:ml-[8%]
                shadow-lg
            ">
                
                {/* Coco Monkey Head - Hidden on Mobile, Visible on Tablet+ */}
                <div className="
                    hidden md:block
                    relative
                    w-[35%] lg:w-[38%] xl:w-[36%]
                    -ml-[6%] lg:-ml-[8%] xl:-ml-[6%]
                    -mt-[2%] -mb-[5%]
                    scale-[1.2] lg:scale-[1.3] xl:scale-[1.4]
                    flex-none origin-center
                    z-30
                ">
                    {head?.thumbnail && <img src={head.thumbnail.url} alt='coco monkey' className="w-full h-auto drop-shadow-lg block" />}
                </div>

                {/* Mobile Monkey Head - Smaller, Top Positioned */}
                <div className="
                    block md:hidden
                    absolute -top-14 left-1/2 -translate-x-1/2
                    w-28 sm:w-32
                    z-30
                ">
                    {head?.thumbnail && <img src={head.thumbnail.url} alt='coco monkey' className="w-full h-auto drop-shadow-lg block" />}
                </div>

                {/* Content Box - Responsive Grid with Boxes around each section */}
                <div className="
                    grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
                    gap-8 md:gap-6 lg:gap-8
                    w-full 
                    pt-16 md:pt-0
                    md:pl-[5%] lg:pl-[8%]
                ">
                    {items.map((item, index) => {
                        const iconUrl = item.icons?.url || item.icon?.url || item.image?.url ||
                            (item.icons && item.icons[0] && item.icons[0].url) || null;
                        const title = item.icon_description?.title || item.title || '';
                        const desc = item.icon_description?.description || item.description || '';
                        
                        return (
                            <div 
                                className="
                                    flex flex-col items-center text-center 
                                    px-4 py-5 md:px-4 md:py-6 lg:px-5 lg:py-7
                                    bg-white/20 backdrop-blur-sm rounded-xl
                                    border border-white/30
                                    hover:bg-white/30 transition-all duration-300
                                " 
                                key={index}
                            >
                                {/* Icon - Centered Mobile, Left Desktop */}
                                <div className="h-14 sm:h-16 md:h-[60px] lg:h-[70px] w-full flex items-center justify-center mb-3">
                                    {iconUrl &&
                                        <img src={iconUrl} alt='item icon' className="max-w-[45px] sm:max-w-[50px] md:max-w-[45px] lg:max-w-[55px] max-h-[55px] sm:max-h-[60px] md:max-h-[60px] lg:max-h-[70px] w-auto h-auto object-contain" />
                                    }
                                </div>
                                
                                {/* Title - Centered Mobile, Left Desktop */}
                                <div className="
                                    font-bold text-center w-full 
                                    min-h-[2.4em] md:min-h-[2.8em] lg:min-h-[2.8em]
                                    flex items-center justify-center
                                    text-sm sm:text-base md:text-[clamp(0.85rem,1.1vw,1.1rem)]
                                    leading-tight text-black
                                    mb-2
                                ">
                                    {title}
                                </div>
                                
                                {/* Description - Centered Mobile, Left Desktop */}
                                <div 
                                    className={`
                                        text-left w-fit mx-auto 
                                        ${index !== 0 ? 'md:pl-4 lg:pl-6' : ''}
                                        text-xs sm:text-sm md:text-[clamp(0.72rem,0.95vw,0.95rem)]
                                        leading-relaxed md:leading-[1.45] text-[#333]
                                        max-w-full
                                    `}
                                    dangerouslySetInnerHTML={{ __html: desc }}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CocoHead;
