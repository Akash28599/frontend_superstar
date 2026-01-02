import React, { useEffect, useState } from 'react';

const CocoHeads = () => {
  const [items, setItems] = useState([]);
  const [head, setHead] = useState(null);
  const [starImage, setStarImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

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

  const getYellowWidth = () => {
    if (screenWidth >= 1920) return '980px';
    if (screenWidth >= 1440) return '900px';
    if (screenWidth >= 1200) return '980px';
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

      <div style={{
        width: yellowWidth,
        backgroundColor: '#FBCA05',
        borderRadius: '32px',
        padding: screenWidth >= 1440 ? '0.3rem 0.1rem 2.2rem 140px' : '0.3rem 1.1rem 2.2rem 120px',
        display: 'flex',
        alignItems: 'flex-start',
        position: 'relative',
        overflow: 'visible',
        gap: '1rem',
        minHeight: '300px',
        height: screenWidth >= 1440 ? '274px' : '280px',
        left: screenWidth >= 1440 ? '4%' : '2%',
        marginTop:"10%"
      }}>
        {head?.thumbnail && (
          <div style={{
            position: 'absolute',
            left: screenWidth >= 1440 ?'-30px':'-100px',
            top: '-40px',
            pointerEvents: 'none',
          }}>
            <img 
              src={head.thumbnail.url} 
              alt="Coco head" 
              style={{ 
                width: screenWidth >= 1440 ? '416.5469970703125px' : '520px',
                height: screenWidth >= 1440 ? '354.79876708984375px' : '365px',
                objectFit: 'contain',
                display: 'block',
              }} 
            />
          </div>
        )}

        <div style={{
          display: 'flex',
          gap: screenWidth >= 1440 ? '1.5rem' : '1rem',
          alignItems: 'stretch',
          justifyContent: 'center',
          width: '100%',
          boxSizing: 'border-box',
          marginLeft: screenWidth >= 1440 ? '23%' : '28%',
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
                boxSizing: 'border-box',
                padding: '0.6rem',
                flex: '1 1 0',
                height: '100%',
                justifyContent: 'space-between',
              }}>
                {/* ICON SECTION */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '62px',
                  width: '100%',
                  marginBottom: '1rem',
                }}>
                  {iconUrl ? (
                    <img 
                      src={iconUrl} 
                      alt={item.icon_description?.title || 'icon'} 
                      style={{ 
                        width: '75px',
                        height: '62px',
                        objectFit: 'contain',
                        display: 'block',
                      }} 
                    />
                  ) : (
                    <div style={{
                      width: '75px',
                      height: '62px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(0,0,0,0.06)',
                    }} />
                  )}
                </div>

                {/* TITLE SECTION */}
                <div style={{
                  width: '100%',
                  minHeight: '52px',
                  height: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '0.6rem',
                  padding: '4px 8px',
                }}>
                  <h3 style={{
                    fontFamily: "'Kellogg's Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: screenWidth >= 1440 ? '20px' : '18px',
                    lineHeight: '1.2',
                    letterSpacing: '0%',
                    textAlign: 'center',
                    color: '#2A2F2F',
                    margin: 0,
                    padding: 0,
                    width: '100%',
                    wordWrap: 'break-word',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                  }}>
                    {title}
                  </h3>
                </div>

                {/* DESCRIPTION SECTION - FIXED ALIGNMENT */}
                <div style={{
                  width: '100%',
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center', // Changed from flex-start to center
                  justifyContent: 'center',
                  minHeight: '60px',
                }}>
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center', // Center vertically
                    justifyContent: 'center', // Center horizontally
                    position:'relative',
                    left:'8%'
                  }}>
                    <p style={{
                      fontFamily: "'Kellogg's Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: screenWidth >= 1440 ? '0.95rem' : '0.85rem',
                      lineHeight: '1.4',
                      color: '#2A2F2F',
                      margin: 0,
                      textAlign: 'left',
                      width: '100%',
                      wordWrap: 'break-word',
                      display: 'flex',
                      alignItems: 'center', // Add this for better vertical alignment
                      justifyContent: 'center',
                      minHeight: '60px',
                    }}>
                      {desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CocoHeads;