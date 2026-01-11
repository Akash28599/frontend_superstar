import React, { useEffect, useState } from 'react';

const CocoHeads = ({dpr}) => {
  const [items, setItems] = useState([]);
  const [head, setHead] = useState(null);
  const [starImage, setStarImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth*dpr);


  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  if (loading) return <div>Loading...</div>;

  const getYellowWidth = () => {
    if (screenWidth >= 1920) return '1450px';
    if (screenWidth >= 1440) return '1100px';
    if (screenWidth >= 1200) return '1080px';
    return 'calc(100vw - 4rem)';
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
      {starImage && (
        <div style={{
          position: 'absolute',
          left: screenWidth >= 1440 ? '-5%' : '-5%',
          top: '16%',
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

      <div style={{
        justifySelf: 'center',
        width: yellowWidth,
        backgroundColor: '#FBCA05',
        borderRadius: '32px',
        padding: screenWidth >= 1440 ? '2rem' : '1.5rem',
        display: 'flex',
        flexDirection: 'row', 
        alignItems: 'center', 
        position: 'relative',
        overflow: 'visible',
        boxSizing: 'border-box',
        gap: screenWidth >= 1440 ? '2rem' : '1rem', // Gap between ALL 4 element
        height: 'auto',
        marginTop: "5%",
        marginBottom: "5%"
      }}>
        {/* COCO HEAD - NOW A FLEX ITEM */}
        {head?.thumbnail && (
          <div style={{
            flex: '0 0 auto', // Don't shrink
            width: screenWidth >= 1440 ? '25%' : '20%', // Adjusted width
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative', 
            marginLeft: screenWidth >= 1440 ? '-2%' : '-1%', 
            zIndex: 10
          }}>
            <img
              src={head.thumbnail.url}
              alt="Coco head"
              style={{
                width: screenWidth >= 1440 ? '110%' : '100%', // Reduced width to prevent overlap
                height: 'auto',
                objectFit: 'contain',
                display: 'block',
                transform: screenWidth >= 1440 ? 'scale(1.1) translateY(-5%)' : 'scale(1.05) translateY(-5%)', // Reduced scale
              }}
            />
          </div>
        )}

        {/* ITEMS - DIRECTLY MAPPED (Flattened via Fragment if needed, or just map array) */}
        {items.map(item => {
            const iconUrl = item.icons?.url || item.icon?.url || item.image?.url ||
              (item.icons && item.icons[0] && item.icons[0].url) || null;
            const title = item.icon_description?.title || item.title || '';
            const desc = item.icon_description?.description || item.description || '';

            return (
              <div key={item.id} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                textAlign: 'left',
                flex: 1, // Distribute remaining space equally
                minWidth: '0', // Allow text truncation/wrapping in flex
                height: 'auto',
                padding: '0 1rem', // Internal padding
                borderLeft: '1px solid rgba(0,0,0,0.1)' // Optional separator visually? Removed for now.
              }}>
                {/* ICON SECTION */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  height: '80px',
                  marginBottom: '1rem',
                  width: '100%'
                }}>
                  {iconUrl ? (
                    <img
                      src={iconUrl}
                      alt={item.icon_description?.title || 'icon'}
                      style={{
                        width: 'auto',
                        height: '60px',
                        objectFit: 'contain',
                        display: 'block',
                      }}
                    />
                  ) : null}
                </div>

                {/* TITLE SECTION */}
                <div style={{
                  width: '100%',
                  marginBottom: '0.5rem',
                }}>
                  <h4 style={{
                    fontFamily: "'Kellogg's Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: screenWidth >= 1440 ? '1.5rem' : '1.2rem',
                    lineHeight: '1.2',
                    color: '#2A2F2F',
                    margin: 0,
                    textAlign: 'left',
                  }}>
                    {title}
                  </h4>
                </div>

                {/* DESCRIPTION SECTION */}
                <div style={{
                    width: '100%',
                }}>
                  <p style={{
                    fontFamily: "'Kellogg's Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: screenWidth >= 1440 ? '1rem' : '0.9rem',
                    lineHeight: '1.5',
                    color: '#2A2F2F',
                    margin: 0,
                    textAlign: 'left',
                    width: '100%',
                  }}>
                    {desc}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CocoHeads;