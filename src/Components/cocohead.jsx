import React, { useEffect, useState } from 'react';

const CocoHeads = () => {
  const [items, setItems] = useState([]);
  const [head, setHead] = useState(null);
  const [starImage, setStarImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://correct-prize-f0a5924469.strapiapp.com/api/coco-heads?populate=*')
      .then(res => res.json())
      .then(json => {
        const data = json.data || [];
        // pick first item with thumbnail as head
        const headItem = data.find(d => d.thumbnail);
        
        // find star image (item without icon_description)
        const starItem = data.find(d => !d.icon_description && d.icons);
        
        // remaining items that look like icons (has icon_description)
        const iconItems = data.filter(d => d.icon_description && d.icon_description.title);
        
        setHead(headItem || null);
        
        // Get star image URL
        if (starItem?.icons) {
          const starUrl = 
            starItem.icons.formats?.small?.url ||
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

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '3rem 0',
        backgroundColor: 'white',
        position: 'relative', // For absolute positioning of star
      }}
    >
      {/* Star image - positioned absolutely outside yellow div */}
      {starImage && (
        <div
          style={{
            position: 'absolute',
            left: '-5%', // Adjust left position as needed
            top: '17%', // Center vertically
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        >
          <img
            src={starImage}
            alt="Stars"
            style={{
              width: '322px', // Original width from API
              height: '543px', // Original height from API
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>
      )}

      {/* Yellow main container */}
      <div
        style={{
          width: '980px', // Fixed width
          backgroundColor: '#FBCA05',
          borderRadius: '32px',
          padding: '0.3rem 0.1rem 2.2rem 140px',
          display: 'flex',
          alignItems: 'flex-start',
          position: 'relative',
          overflow: 'visible',
          gap: '1rem',
          minHeight: '234px', // Fixed height
          height: '274px', // Fixed height
          left:'4%'
        }}
      >
        {/* Left: Coco head (floating) */}
        {head?.thumbnail && (
          <div
            style={{
              position: 'absolute',
              left: '-30px',
              top: '-40px',
              pointerEvents: 'none',
            }}
          >
            <img
              src={head.thumbnail.url}
              alt="Coco head"
              style={{
                width: '416.5469970703125px', // Exact width
                height: '351.79876708984375px', // Exact height
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </div>
        )}

        {/* Right: Horizontal list of icons + text */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'flex-start',
            width: '100%',
            boxSizing: 'border-box',
            marginLeft: '23%'
          }}
        >
          {items.map(item => {
            // normalize icon url
            const iconUrl =
              item.icons?.url ||
              item.icon?.url ||
              item.image?.url ||
              (item.icons && item.icons[0] && item.icons[0].url) ||
              null;

            const title = item.icon_description?.title || item.title || '';
            const desc = item.icon_description?.description || item.description || '';

            return (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  width: '220px',
                  minHeight: '220px',
                  boxSizing: 'border-box',
                  padding: '0.6rem',
                }}
              >
                {/* ICON */}
                {iconUrl ? (
                  <img
                    src={iconUrl}
                    alt={item.icon_description?.title || 'icon'}
                    style={{
                      width: '75px', // Updated width
                      height: '62px', // Updated height
                      objectFit: 'contain',
                      marginBottom: '1rem',
                      display: 'block',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '75px',
                      height: '62px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(0,0,0,0.06)',
                      marginBottom: '1rem',
                    }}
                  />
                )}

                {/* TITLE */}
                <h3
                  style={{
                    fontFamily: "'Kellogg's Sans', sans-serif",
                    fontWeight: 700, // Regular
                    fontSize: '20px',
                    lineHeight: '19px',
                    letterSpacing: '0%',
                    textAlign: 'center',
                    color: '#2A2F2F', // Heading color
                    margin: '0 0 0.6rem 0',
                    minHeight: '52px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 0.4rem',
                  }}
                >
                  {title}
                </h3>

                {/* DESCRIPTION */}
                <p
                  style={{
                    fontFamily: "'Kellogg's Sans', sans-serif", // Same font for description
                    fontWeight: 400, // Regular
                    fontSize: '0.95rem',
                    lineHeight: 1.4,
                    color: '#2A2F2F', // Description color
                    margin: 0,
                  }}
                >
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