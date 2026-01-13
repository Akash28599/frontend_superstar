import { useEffect, useState } from 'react';
import { constants } from '../../Utils/constants';

export const CocoHead = () => {
    const [items, setItems] = useState([]);
    const [head, setHead] = useState(null);
    const [starImage, setStarImage] = useState(null);
    const [loading, setLoading] = useState(true);

    // const isEdge = /Edg|Edge/.test(navigator.userAgent); // Tailwind handles browser inconsistencies better, removing usage

    useEffect(() => {
        fetch(`${process.env.REACT_APP_STRAPI_URL}/api/coco-heads?populate=*`)
            .then(res => res.json())
            .then(json => {
                const data = json.data || [];
                const headItem = data.find(d => d.thumbnail);
                const starItem = data.find(d => !(d.icon_description && d.icons));
                const iconItems = data.filter(d => d.icon_description && d.icon_description.title);

                setHead(headItem || null);

                if (starItem?.icons) {
                    const starUrl = starItem.icons.formats?.small?.url ||
                        starItem.icons.formats?.thumbnail?.url ||
                        starItem.icons.url;
                    setStarImage(starUrl);
                }

                setItems(iconItems);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="relative flex flex-col tablet:flex-row items-center justify-center w-full mt-20 mb-[10%] px-[2%] tablet:px-[5%] gap-4 font-kelloggs">
            
            {/* Star Section Removed */}

            {/* Yellow Banner */}
            <div className="
                relative bg-kelloggs-gold 
                w-[85%] tablet:w-[80%] desktop:w-[75%] wide:w-[70%] max-w-[1200px]
                min-h-[250px] tablet:min-h-[300px] rounded-[32px] 
                p-4 tablet:p-8 
                flex flex-row items-center 
                ml-[2%] tablet:ml-[5%] desktop:ml-[8%]
                shadow-sm
            ">
                
                {/* Coco Monkey Head - Desktop/Tablet */}
                <div className="
                    absolute -top-[50px] left-[-10px] w-[120px] z-30
                    tablet:relative tablet:top-auto tablet:left-auto
                    tablet:w-[40%] desktop:w-[38%] wide:w-[36%]
                    tablet:-ml-[8%] desktop:-ml-[8%] wide:-ml-[6%]
                    tablet:scale-[1.6] desktop:scale-[1.5] wide:scale-[1.4]
                    tablet:flex-none origin-center
                    hidden tablet:block
                ">
                    {head?.thumbnail && <img src={head.thumbnail.url} alt='coco monkey' className="w-full h-auto drop-shadow-lg block" />}
                </div>

                {/* Mobile/High Scale Monkey Head (Absolute positioned to save space) */}
                 <div className="
                    absolute -left-[5%] top-[50%] -translate-y-1/2 w-[22%] z-30
                    tablet:hidden
                ">
                    {head?.thumbnail && <img src={head.thumbnail.url} alt='coco monkey' className="w-full h-auto drop-shadow-lg block scale-150" />}
                </div>


                {/* Content Box */}
                <div className="
                    flex flex-row flex-1 justify-between gap-2 tablet:gap-4 
                    w-full 
                    pl-[22%] tablet:pl-[15%] desktop:pl-[14%] wide:pl-[10%]
                ">
                    {items.map((item, index) => {
                        const iconUrl = item.icons?.url || item.icon?.url || item.image?.url ||
                            (item.icons && item.icons[0] && item.icons[0].url) || null;
                        const title = item.icon_description?.title || item.title || '';
                        const desc = item.icon_description?.description || item.description || '';
                        
                        return (
                            <div className="flex flex-col flex-1 items-start justify-start text-left px-1 tablet:px-2" key={index}>
                                {/* Icon */}
                                <div className="h-[60px] tablet:h-[80px] w-full flex items-center justify-start mb-2">
                                    {iconUrl &&
                                        <img src={iconUrl} alt='item icon' className="max-w-[45px] tablet:max-w-[60px] max-h-[60px] tablet:max-h-[80px] w-auto h-auto object-contain" />
                                    }
                                </div>
                                
                                {/* Title */}
                                <div className="
                                    font-bold text-left w-full 
                                    min-h-[2.5rem] tablet:min-h-[4.5rem] 
                                    flex items-center justify-start
                                    text-[clamp(0.75rem,1.1vw,1.3rem)] 
                                    leading-tight text-black
                                ">
                                    {title}
                                </div>
                                
                                {/* Description */}
                                <div className="
                                    text-left w-full 
                                    text-[clamp(0.7rem,1vw,1.1rem)] 
                                    leading-[1.4] text-[#333] mt-2
                                    max-w-[98%] tablet:max-w-[95%]
                                    flex justify-start
                                ">
                                    {desc}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default CocoHead;
