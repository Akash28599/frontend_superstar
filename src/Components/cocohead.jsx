import React, { useEffect, useState } from 'react';

const CocoHeads = () => {
  const [items, setItems] = useState([]);
  const [head, setHead] = useState(null);
  const [starImage, setStarImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); // ✅ DYNAMIC WIDTH

  // ✅ RESPONSIVE WIDTH LISTENER
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetch('https://correct-prize-f0a5924469.strapiapp.com/api/coco-heads?populate=*')
      .then(res => res.json())
      .then(json => {
        const data = json.data || [];
        const headItem = data.find(d => d.thumbnail);
        const starItem = data.find(d => !d.icon_description && d.icons);
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

  if (loading) return <div>Loading...</div>;

  // ✅ DYNAMIC YELLOW DIV WIDTH BASED ON SCREEN SIZE
  const getYellowWidth = () => {
    if (screenWidth >= 1920) return '980px';  // Your "good" laptop
    if (screenWidth >= 1440) return '900px';  // Medium desktops
    if (screenWidth >= 1200) return '820px';  // Your smaller laptop - REDUCED
    return 'calc(100vw - 4rem)';              // Mobile/tablet
  };

  const yellowWidth = getYellowWidth();

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      padding: '3rem 0', 
      backgroundColor: 'white', 
      position: 'relative',
    }}>
      {/* Star image - positioned absolutely outside yellow div */}
      {starImage && (
        <div style={{
          position: 'absolute',
          left: screenWidth >= 1440 ? '-5%' : '-5%',
          top: '19%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}>
          <img 
            src={starImage} 
            alt="Stars" 
            style={{ 
              width: screenWidth >= 1440 ? '322px' : '280px',
              height: screenWidth >= 1440 ? '543px' : '470px',
              objectFit: 'contain',
              display: 'block',
            }} 
          />
        </div>
      )}

      {/* ✅ DYNAMIC YELLOW MAIN CONTAINER */}
      <div style={{
        width: yellowWidth,  // ✅ DYNAMIC WIDTH
        backgroundColor: '#FBCA05',
        borderRadius: '32px',
        padding: screenWidth >= 1440 ? '0.3rem 0.1rem 2.2rem 140px' : '0.3rem 0.1rem 2.2rem 120px',
        display: 'flex',
        alignItems: 'flex-start',
        position: 'relative',
        overflow: 'visible',
        gap: '1rem',
        minHeight: '234px',
        height: screenWidth >= 1440 ? '274px' : '260px',
        left: screenWidth >= 1440 ? '4%' : '2%',
      }}>
        {/* Left: Coco head (floating) */}
        {head?.thumbnail && (
          <div style={{
            position: 'absolute',
            left: '-30px',
            top: '-40px',
            pointerEvents: 'none',
          }}>
            <img 
              src={head.thumbnail.url} 
              alt="Coco head" 
              style={{ 
                width: screenWidth >= 1440 ? '416.5469970703125px' : '360px',
                height: screenWidth >= 1440 ? '354.79876708984375px' : '325px',
                objectFit: 'contain',
                display: 'block',
              }} 
            />
          </div>
        )}

        {/* Right: Horizontal list of icons + text */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'flex-start',
          width: '100%',
          boxSizing: 'border-box',
          marginLeft: screenWidth >= 1440 ? '23%' : '20%',
        }}>
          {items.map(item => {
            const iconUrl = item.icons?.url || item.icon?.url || item.image?.url || 
                           (item.icons && item.icons[0] && item.icons[0].url) || null;
            const title = item.icon_description?.title || item.title || '';
            const desc = item.icon_description?.description || item.description || '';

            return (
              <div key={item.id} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                width: screenWidth >= 1440 ? '220px' : '190px',
                minHeight: '220px',
                boxSizing: 'border-box',
                padding: '0.6rem',
              }}>
                {/* ICON */}
                {iconUrl ? (
                  <img 
                    src={iconUrl} 
                    alt={item.icon_description?.title || 'icon'} 
                    style={{ 
                      width: '75px',
                      height: '62px',
                      objectFit: 'contain',
                      marginBottom: '1rem',
                      display: 'block',
                    }} 
                  />
                ) : (
                  <div style={{
                    width: '75px',
                    height: '62px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(0,0,0,0.06)',
                    marginBottom: '1rem',
                  }} />
                )}

                {/* TITLE */}
                <h3 style={{
                  fontFamily: "'Kellogg's Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: screenWidth >= 1440 ? '20px' : '18px',
                  lineHeight: '19px',
                  letterSpacing: '0%',
                  textAlign: 'center',
                  color: '#2A2F2F',
                  margin: '0 0 0.6rem 0',
                  minHeight: '52px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 0.4rem',
                }}>
                  {title}
                </h3>

                {/* DESCRIPTION */}
                <p style={{
                  fontFamily: "'Kellogg's Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: screenWidth >= 1440 ? '0.95rem' : '0.85rem',
                  lineHeight: 1.4,
                  color: '#2A2F2F',
                  margin: 0,
                }}>
                  {desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CocoHeads;
