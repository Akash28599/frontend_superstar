import React, { useEffect, useState } from 'react';

const CocoHeads = () => {
  const [items, setItems] = useState([]);
  const [head, setHead] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://correct-prize-f0a5924469.strapiapp.com/api/coco-heads?populate=*')
      .then(res => res.json())
      .then(json => {
        const data = json.data || [];
        // pick first item with thumbnail as head
        const headItem = data.find(d => d.thumbnail);
        // remaining items that look like icons (has icon_description)
        const iconItems = data.filter(d => d.icon_description && d.icon_description.title);
        setHead(headItem || null);
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
      }}
    >
      {/* Yellow main container */}
      <div
        style={{
          width: '70%',
          backgroundColor: '#FBCA05',
          borderRadius: '32px',
          padding: '3rem 3rem 3rem 220px', // left padding to make room for floating head
          display: 'flex',
          alignItems: 'flex-start',
          position: 'relative',
          overflow: 'visible',
          gap: '3rem',
        }}
      >
        {/* Left: Coco head (floating) */}
        {head?.thumbnail && (
          <div
            style={{
              position: 'absolute',
              left: '-80px',
              top: '-60px',
              pointerEvents: 'none',
            }}
          >
            <img
              src={head.thumbnail.url}
              alt="Coco head"
              style={{
                width: '460px',
                height: '420px',
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
            alignItems: 'flex-start', // keep tops aligned
            width: '100%',
            boxSizing: 'border-box',
            marginLeft:"23%"
          }}
        >
          {items.map(item => {
            // normalize icon url (some records use different fields)
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
                  width: '220px', // fixed width for every card
                  minHeight: '220px', // enforce same vertical space
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
                      width: '80px',
                      height: '80px',
                      objectFit: 'contain',
                      marginBottom: '1rem',
                      display: 'block',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(0,0,0,0.06)',
                      marginBottom: '1rem',
                    }}
                  />
                )}

                {/* TITLE: keep minHeight so descriptions align */}
                <h3
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 800,
                    color: 'black',
                    margin: '0 0 0.6rem 0',
                    minHeight: '52px', // <-- critical: ensures titles consume same vertical space
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '0 0.4rem',
                  }}
                >
                  {title}
                </h3>

                {/* DESCRIPTION */}
                <p
                  style={{
                    fontSize: '0.95rem',
                    color: '#3b2a00',
                    margin: 0,
                    lineHeight: 1.4,
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
