import React, { useEffect, useState } from 'react';
import './CocoBanner.css';

const CocoBanner = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_STRAPI_URL}/api/cocobanners?populate=*`)
      .then(res => res.json())
      .then(resData => setData(resData.data ? resData.data[0] : null))
      .finally(() => setLoading(false))
      .catch(err => console.error(err));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No data available</div>;

  const { title, description, image } = data;
  const charImg = image?.url ?? null;

  return (
    <div className="coco-banner">
      <img src="/assetss/cocobanner.png" alt="wave background" className="coco-banner-wave" />
      {charImg && <img src={charImg} alt="character" className="coco-character" />}
      <img src="/assetss/cloud1.png" alt="cloud" className="coco-cloud" />
      <div className="coco-text">
        <h1 className="coco-title">{title}</h1>
        <div className="coco-desc" dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </div>
  );
};

export default CocoBanner;
