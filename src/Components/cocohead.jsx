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
        const headItem = data.find(d => d.thumbnail); // coco-smile
        const iconItems = data.filter(d => d.icon_description); // book, heart, star [file:1]
        setHead(headItem);
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
        backgroundColor: 'white'
      }}
    >
      {/* Yellow main container: 80% width */}
      <div
        style={{
          width: '80%',
          backgroundColor: '#FBCA05',
          borderRadius: '32px',
          padding: '2.5rem 3rem',
          display: 'flex',
          alignItems: 'flex-start',
          position: 'relative',
          overflow: 'visible',
          gap: '3rem',
        }}
      >
        {/* Left: Coco head, slightly bigger than yellow div */}
        {head?.thumbnail && (
          <div
            style={{
              position: 'absolute',
              left: '-80px',
              top: '-60px',
            }}
          >
            <img
              src={head.thumbnail.url}
              alt="Coco head"
              style={{
                width: '460px',
                height: '420px',
                objectFit: 'contain',
              }}
            />
          </div>
        )}

        {/* Spacer to account for floating head */}
        <div style={{ width: '200px' }} />

        {/* Right: Horizontal list of icons + text */}
        <div
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'space-between',
            gap: '2.5rem',
            marginLeft:"100px"
          }}
        >
          {items.map(item => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                maxWidth: '220px',
              }}
            >
              {item.icons && (
                <img
                  src={item.icons.url}
                  alt={item.icons.name}
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'contain',
                    marginBottom: '1rem',
                  }}
                />
              )}

              <h3
                style={{
                  fontSize: '1.3rem',
                  fontWeight: 800,
                  color: 'black',
                  margin: '0 0 0.4rem 0',
                }}
              >
                {item.icon_description?.title}
              </h3>
              <p
                style={{
                  fontSize: '0.95rem',
                  color: '#3b2a00',
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                {item.icon_description?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CocoHeads;
