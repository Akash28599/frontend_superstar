import { useEffect, useState } from 'react';
import './Cocohead.css'
export const CocoHead = () => {
    const [items, setItems] = useState([]);
    const [head, setHead] = useState(null);
    const [starImage, setStarImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [scale, setScale] = useState(window.devicePixelRatio);

    useEffect(() => {
        const handleResize = () => {
            setScale(window.devicePixelRatio);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const is100PercentScale = scale === 1;

    console.log(is100PercentScale)
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
        <div className='ch-container'>
            <div className='ch-star'>
                <img src={starImage} alt='stars' />
            </div>
            <div className='ch-yellow-banner'>
                <div className='ch-cocohead'>
                    {head?.thumbnail && <img src={head.thumbnail.url} alt='coco monkey' />}
                </div>
                <div className='ch-yellow-box'>
                    {items.map(item => {
                        const iconUrl = item.icons?.url || item.icon?.url || item.image?.url ||
                            (item.icons && item.icons[0] && item.icons[0].url) || null;
                        const title = item.icon_description?.title || item.title || '';
                        const desc = item.icon_description?.description || item.description || '';
                        return (
                            <div className='ch-content'>
                                <div className='ch-icon'>
                                    {iconUrl &&
                                        <img src={iconUrl} alt='item icon' />}
                                </div>
                                <div className='ch-title' style={{ fontSize: is100PercentScale ? '1.6rem' : '1rem' }}>
                                    {title}
                                </div>
                                <div className='ch-description' style={{ fontSize: is100PercentScale ? '1.3rem' : '.8rem' }}>
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