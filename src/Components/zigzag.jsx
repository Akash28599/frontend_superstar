import React, { useEffect, useState, useRef } from "react";
import '../fonts.css';

const OurProducts = () => {
  const [products, setProducts] = useState([]);
  const [coco, setCoco] = useState(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(1400);

  useEffect(() => {
    let mounted = true;
    fetch(
      "https://correct-prize-f0a5924469.strapiapp.com/api/ourproducts?populate=*"
    )
      .then((r) => r.json())
      .then((json) => {
        if (!mounted) return;
        const data = json.data || [];
        setCoco(data.find((it) => !it.title_description) || null);
        setProducts(data.filter((it) => it.title_description));
      })
      .catch(console.error)
      .finally(() => (mounted && setLoading(false)));
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const measure = () => {
      const w = containerRef.current?.clientWidth || 1400;
      setContainerWidth(Math.max(800, w));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>;

  // Get 7 products for the layout
  const allProducts = [];
  for (let i = 0; i < 7; i++) {
    allProducts.push(products[i] || products[0] || null);
  }

  const [
    product1,
    product2, 
    product3, 
    product4, 
    product5, 
    product6, 
    product7, 
  ] = allProducts;

  const imgUrl = (it) =>
    it?.image?.url ||
    it?.image?.formats?.large?.url ||
    it?.image?.formats?.medium?.url ||
    it?.image?.formats?.thumbnail?.url ||
    "";

  const headingStyle = {
    fontFamily: "'Kellogg's Sans', sans-serif",
    color: "#F60945",
    fontWeight: "Bold", // Bold
    lineHeight: 1.05,
    margin: 0,
    letterSpacing: "0%",
  };
  
  const sectionHeadingWrapper = {
    maxWidth: 1400,
    margin: "0 auto 40px",
    padding: "0 28px",
    textAlign: "center",
  };
  
  const paragraphStyle = {
    fontFamily: "'Kellogg's Sans', sans-serif",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 1.6,
    color: "#4b4b4b",
    marginTop: 10,
    maxWidth: 320,
    letterSpacing: "0%",
  };
  
  const productTitleStyle = {
    fontFamily: "'Kellogg's Sans', sans-serif",
    fontWeight: 700, // Bold
    lineHeight: 1.1,
    margin: 0,
    letterSpacing: "0%",
  };

  // SVG dimensions and positions
  const SVG_WIDTH = containerWidth;
  const SVG_HEIGHT = 1000;
  
  const centerX = containerWidth / 2;
  
  // Updated positions - product3 is on left, product4 is on right
  const positions = {
    product1: { x: containerWidth * 0.15, y: 200 },
    product2: { x: containerWidth * 0.85, y: 200 },
    coco: { x: centerX, y: 500 },
    product3: { x: containerWidth * 0.1, y: 650 },
    product4: { x: containerWidth * 0.7, y: 650 },
    product5: { x: containerWidth * 0.15, y: 1000 },
    product6: { },
    product7: {  },
  };

  const createTopCurve = () => {
    const start = positions.product1;
    const end = positions.product2;
    const controlY = start.y - 80;
    return `M ${start.x} ${start.y} Q ${centerX} ${controlY} ${end.x} ${end.y}`;
  };

  const createZigzagPath = () => {
    const product1ToCoco = `M ${positions.product1.x} ${positions.product1.y} 
                           Q ${positions.product1.x} ${positions.coco.y - 50} 
                           ${positions.coco.x} ${positions.coco.y}`;
    
    const cocoToProduct4 = `M ${positions.coco.x} ${positions.coco.y} 
                           Q ${positions.coco.x + 100} ${(positions.coco.y + positions.product4.y) / 2} 
                           ${positions.product4.x} ${positions.product4.y}`;
    
    const product4ToProduct5 = `M ${positions.product4.x} ${positions.product4.y} 
                               Q ${positions.product4.x - 200} ${(positions.product4.y + positions.product5.y) / 2} 
                               ${positions.product5.x} ${positions.product5.y}`;
    
    const product5ToProduct6 = `M ${positions.product5.x} ${positions.product5.y} 
                               Q ${(positions.product5.x + positions.product6.x) / 2} ${positions.product5.y + 100} 
                               ${positions.product6.x} ${positions.product6.y}`;
    
    const product6ToProduct7 = `M ${positions.product6.x} ${positions.product6.y} 
                               Q ${(positions.product6.x + positions.product7.x) / 2} ${positions.product6.y + 100} 
                               ${positions.product7.x} ${positions.product7.y}`;
    
    return `${product1ToCoco} ${cocoToProduct4} ${product4ToProduct5} ${product5ToProduct6} ${product6ToProduct7}`;
  };

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        background: "#fff",
        overflow: "hidden",
        padding: "2rem 0 20rem",
        minHeight: "100vh",
      }}
    >
      <svg
        width="100%"
        height={SVG_HEIGHT}
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        preserveAspectRatio="xMidYMin slice"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {/* Top curved line connecting product1 and product2 */}
        <path
          d={createTopCurve()}
          fill="none"
          stroke="#d6d6d6"
          strokeWidth={3}
          strokeDasharray="8 10"
          strokeLinecap="round"
        />
        
        {/* Main zigzag line: product1 → Coco center → product4 → product5 → product6 → product7 */}
        <path
          d={createZigzagPath()}
          fill="none"
          stroke="#d6d6d6"
          strokeWidth={3}
          strokeDasharray="8 10"
          strokeLinecap="round"
        />
      </svg>

      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          padding: "0 28px",
          height: SVG_HEIGHT,
        }}
      >
        {/* Section Heading */}
        <div style={sectionHeadingWrapper}>
          <h1 style={{ ...headingStyle, fontSize: 52 }}>Our products</h1>
        </div>

        {/* TOP ROW: Products 1 & 2 */}
        <div>
          {/* Product 1 - Top Left - TEXT ON RIGHT OF IMAGE */}
          {product1 && (
            <div style={{ 
              position: "absolute",
              left: "5%",
              top: "100px",
              width: "45%",
              display: "flex",
              alignItems: "center",
              gap: "30px",
            }}>
              <div style={{ flexShrink: 0 }}>
                <img
                  src={imgUrl(product1)}
                  alt={product1.title_description?.title || "Coco Pods"}
                  style={{
                    maxWidth: 250,
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    pointerEvents: "none",
                  }}
                />
              </div>
              <div style={{ textAlign: "left",position:'relative',top:"40px" }}>
                <h2
                  style={{
                    ...productTitleStyle,
                    fontSize: 34,
                    color: "#333",
                    marginBottom: 10,
                  }}
                >
                  {product1.title_description?.title || "Coco Pods"}
                </h2>
                <p style={{ ...paragraphStyle, margin: "0" }}>
                  {product1.title_description?.description || "Coco Pods are delicious, crunchy, cocoa-flavored cereal bites made from high-quality grains."}
                </p>
              </div>
            </div>
          )}

          {/* Product 2 - Top Right - TEXT ON LEFT OF IMAGE */}
          {product2 && (
            <div style={{ 
              position: "absolute",
              right: "5%",
              top: "150px",
              width: "45%",
              display: "flex",
              alignItems: "center",
              gap: "30px",
              justifyContent: "flex-end",
            }}>
              <div style={{ textAlign: "right" ,position:"relative",left:"6.5%"}}>
                <h2
                  style={{
                    ...productTitleStyle,
                    fontSize: 34,
                    color: "#333",
                    marginBottom: 10,
                  }}
                >
                  {product2.title_description?.title || "Moons & Stars"}
                </h2>
                <p style={{ ...paragraphStyle, margin: "0" }}>
                  {product2.title_description?.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                </p>
              </div>
              <div style={{ flexShrink: 0,position:"relative",left:"5%" }}>
                <img
                  src={imgUrl(product2)}
                  alt={product2.title_description?.title || "Moons & Stars"}
                  style={{
                    maxWidth: 240,
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* COCO - Center - Zigzag line passes through center of this image */}
        <div style={{ 
          position: "absolute",
          left: "50%",
          top: "320px",
          transform: "translateX(-50%)",
          width: "40%",
          textAlign: "center",
          zIndex: 2,
        }}>
          {coco && (
            <div>
              <img
                src={imgUrl(coco)}
                alt="Coco"
                style={{
                  maxHeight: 400,
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  pointerEvents: "none",
                }}
              />
            </div>
          )}
        </div>

        {/* MIDDLE ROW: Products 3 & 4 */}
        <div>
          {/* Product 3 - Bottom Left - This product is NOT touched by the main zigzag line */}
          {product3 && (
            <div style={{ 
              position: "absolute",
              left: "5%",
              top: "550px",
              width: "45%",
              display: "flex",
              alignItems: "center",
              gap: "25px",
            }}>
              <div style={{ flexShrink: 0 }}>
                <img
                  src={imgUrl(product3)}
                  alt={product3.title_description?.title || "Product 3"}
                  style={{
                    maxWidth: 250,
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    pointerEvents: "none",
                  }}
                />
              </div>
              <div style={{ textAlign: "left",position:'relative',bottom:"80px",right:"80px" }}>
                <h3
                  style={{
                    ...productTitleStyle,
                    fontSize: 28,
                    color: "#333",
                    marginBottom: 8,
                  }}
                >
                  {product3.title_description?.title || "Corn Flakes"}
                </h3>
                <p style={{ ...paragraphStyle, margin: "0" }}>
                  {product3.title_description?.description || "Delicious corn flakes description."}
                </p>
              </div>
            </div>
          )}

          {/* Product 4 - Bottom Right - Zigzag line goes to this product AFTER passing through Coco */}
          {product4 && (
            <div style={{ 
              position: "absolute",
              right: "5%",
              top: "550px",
              width: "45%",
              display: "flex",
              alignItems: "center",
              gap: "25px",
              justifyContent: "flex-end",
            }}>
              
              <div style={{ flexShrink: 0,position:'relative',left:"120px" }}>
                <img
                  src={imgUrl(product4)}
                  alt={product4.title_description?.title || "Product 4"}
                  style={{
                    maxWidth: 250,
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    pointerEvents: "none",
                  }}
                />
              </div>
              <div style={{ textAlign: "right" ,position:'relative',top:"60px",left:"60px"}}>
                <h3
                  style={{
                    ...productTitleStyle,
                    fontSize: 28,
                    color: "#333",
                    marginBottom: 8,
                  }}
                >
                  {product4.title_description?.title || "Frosties"}
                </h3>
                <p style={{ ...paragraphStyle, margin: "0" }}>
                  {product4.title_description?.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM PRODUCTS: 5, 6, 7 */}
        <div>
          {/* Product 5 - Far bottom left */}
          {product5 && (
            <div style={{ 
              position: "absolute",
              left: "10%",
              top: "900px",
              width: "40%",
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}>
              <div style={{ flexShrink: 0 }}>
                <img
                  src={imgUrl(product5)}
                  alt={product5.title_description?.title || "Product 5"}
                  style={{
                    maxWidth: 250,
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    pointerEvents: "none",
                  }}
                />
              </div>
              <div style={{ textAlign: "left",position:'relative',bottom:"50px" }}>
                <h3
                  style={{
                    ...productTitleStyle,
                    fontSize: 24,
                    color: "#333",
                    marginBottom: 6,
                  }}
                >
                  {product5.title_description?.title || "Product 5"}
                </h3>
                <p style={{ 
                  ...paragraphStyle, 
                  margin: "0", 
                  fontSize: 14, 
                  maxWidth: 240,
                  fontWeight: 400 
                }}>
                  {product5.title_description?.description || "Cereal description goes here."}
                </p>
              </div>
            </div>
          )}

          {/* Product 6 - Far bottom right */}
        </div>
      </div>
    </section>
  );
};

export default OurProducts;