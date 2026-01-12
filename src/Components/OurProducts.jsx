import React, { useEffect, useState, useRef } from "react";
import "../fonts.css";

const OurProducts = () => {
  const [products, setProducts] = useState([]);
  const [coco, setCoco] = useState(null);
  const [loading, setLoading] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); // ✅ ADDED
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(1400);

  // ✅ MACBOOK DETECTION
  const isMacBook = screenWidth >= 1440 && screenWidth < 1920;
  const isSmallScreen = screenWidth < 1200;
  const isMediumScreen = screenWidth >= 1200 && screenWidth < 1400;
  const is200Scale = screenWidth < 1000;
  const isFirefox = typeof navigator !== "undefined" && navigator.userAgent.toLowerCase().includes("firefox");

  useEffect(() => {
    let mounted = true;
    fetch(
      `${process.env.REACT_APP_STRAPI_URL}/api/our-products?populate=*`
    )
      .then((r) => r.json())
      .then((json) => {
        if (!mounted) return;
        const data = json.data || [];
        setCoco(data.find((it) => !it.title_description) || null);
        setProducts(data.filter((it) => it.title_description));
      })
      .catch(console.error)
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  // ✅ SCREEN WIDTH TRACKING
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (!containerRef.current) return;

    const ro = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });

    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>;

  // ensure at least 7 entries
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
  ] = allProducts;

  const imgUrl = (it) =>
    it?.image?.url ||
    it?.image?.formats?.large?.url ||
    it?.image?.formats?.medium?.url ||
    it?.image?.formats?.thumbnail?.url ||
    "";
  const constants = { gold: "#f3c720", red: "#dd2120", font: '"KelloggsSans", Arial, sans-serif' }
  const headingStyle = {
    fontFamily: constants.font,
    color: constants.red,
    fontWeight: "bold",
    lineHeight: 1.05,
    margin: 0,
    marginTop: '20px',
    letterSpacing: "0%",
  };

  const sectionHeadingWrapper = {
    maxWidth: 1400,
    margin: "0 auto 40px",
    padding: "0 38px",
    textAlign: "center",
  };

  const paragraphStyle = {
    fontFamily: constants.font,
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 1.6,
    color: "#4b4b4b",
    marginTop: 10,
    maxWidth: 320,
    letterSpacing: "0%",
  };

  const productTitleStyle = {
    fontFamily: constants.font,
    fontWeight: 700,
    lineHeight: 1.1,
    margin: 0,
    fontSize: is200Scale ? 26 : 34, // Reduced font size for 200% scale
    letterSpacing: "0%",
  };

  // SVG dimensions and product anchor positions
  const SVG_WIDTH = containerWidth;
  const centerX = containerWidth / 2;

  const positions = {
    product1: { x: containerWidth * 0.15, y: 158 },
    product2: { x: containerWidth * 0.85, y: 279 },
    coco: { x: centerX, y: 550 },
    product3: { x: containerWidth * 0.18, y: 690 },
    product4: { x: containerWidth * 0.78, y: 970 },
    product5: { x: containerWidth * (is200Scale ? 0.22 : 0.16), y: 1115 },
  };

  const createTopCurve = () => {
    const { product1, product2 } = positions;
    const controlY = product1.y - 230;
    const cp1x = centerX * 0.5;
    const cp2x = centerX * 1.5;
    return `M ${product1.x + 3} ${product1.y + 11}
            C ${cp1x + 10} ${controlY + 10},
              ${cp2x + 10} ${controlY},
              ${product2.x} ${product2.y}`;
  };

  const createMainPath = () => {
    const { product1, coco, product4, product5 } = positions;

    const s1 = is200Scale ?
                `M ${product1.x} ${product1.y}
                 C ${product1.x} ${coco.y - 120},
                   ${coco.x - 120} ${coco.y + 200},
                   ${coco.x} ${coco.y + 200}`
                : isSmallScreen ?
                `M ${product1.x} ${product1.y}
                 C ${product1.x} ${coco.y - 120},
                   ${coco.x - 120} ${coco.y + 200},
                   ${coco.x} ${coco.y + 200}`
                :
                `M ${product1.x} ${product1.y}
                 C ${product1.x} ${coco.y - 200},
                   ${coco.x - 80} ${coco.y - 40},
                   ${coco.x} ${coco.y}`;

    const s2 = screenWidth >= 1900 ?
                `C ${coco.x + 80} ${coco.y + 40},
                  ${product4.x +100} ${(coco.y + product4.y-10) / 2},
                  ${product4.x+100} ${product4.y }`
                  :
                isSmallScreen ?
                (screenWidth < 1000 ?
                  // 200% Scale: Push curve WAY DOWN on BOTH sides
                  // Start: coco.y + 450, End: product4.y + 450
                  `C ${coco.x + 40} ${coco.y + 450},
                   ${product4.x - 40} ${(coco.y + product4.y + 250) / 2},
                   ${product4.x} ${product4.y + 350}`
                  :
                  // Standard Small Screen
                  `C ${coco.x + 50} ${coco.y + 200},
                   ${product4.x - 50} ${(coco.y + product4.y + 200) / 2},
                   ${product4.x} ${product4.y + 250}`
                )
                :
                `C ${coco.x + 80} ${coco.y + 40},
                  ${product4.x + 80} ${(coco.y + product4.y) / 2},
                  ${product4.x} ${product4.y + 50}`;

    const s3 = screenWidth >= 1900 ?
                 `C ${product4.x - 100} ${product4.y + 50},
                  ${product5.x + 20} ${product5.y - 57},
                  ${product5.x-10 } ${product5.y }` 
                 : 
                 is200Scale ?
                 `C ${product4.x - 100} ${product4.y + 820},
                  ${product5.x + 100} ${product5.y - 60},
                  ${product5.x + 20} ${product5.y + 700}`
                 :
                 isSmallScreen ?
                 // 175% Scale
                 `C ${product4.x - 100} ${product4.y + 590},
                  ${product5.x + 100} ${product5.y - 30},
                  ${product5.x + 20} ${product5.y + 510}`
                 :
                 isMediumScreen ?
                 `C ${product4.x - 100} ${product4.y + 300},
                  ${product5.x + 100} ${product5.y - 50},
                  ${product5.x - 20} ${product5.y + 150}`
                 :
                 `C ${product4.x - 100} ${product4.y + 100},
                  ${product5.x + 20} ${product5.y - 57},
                  ${product5.x - 120} ${product5.y + 60}`;

    const s4 = //true?``:
    screenWidth >= 1900 ? 
                  `${product4.x -950} ${product5.y +40},
                  ${product4.x -900} ${product5.y +100},
                  ${product4.x -900} ${product5.y +100}`
                :
                 ``;


    //  return `${s1} ${s2} ${s3}`;
    return `${s1} ${s2} ${s3} ${s4}`;

  };

  // reusable row component with custom text positioning
  const ProductRow = ({
    side = "left",
    top,
    imgMaxWidth,
    product,
    customTextStyle = {},
    customImageStyle = {},
  }) => {
    if (!product) return null;
    const isLeft = side === "left";

    return (
      <div
        style={{
          position: "absolute",
          [isLeft ? "left" : "right"]: is200Scale ? "12%" : "6%",
          top,
          width: "44%",
          display: "flex",
          flexDirection: "row",
          justifyContent: isLeft ? "flex-start" : "flex-end",
          alignItems: "center",
          gap: 28,
        }}
      >
        {!isLeft && (
          <div style={{ textAlign: "right", maxWidth: 320, ...customTextStyle }}>
            <h2
              style={{
                ...productTitleStyle,
                color: "#333",
                marginBottom: 10,
              }}
            >
              {product.title_description?.title}
            </h2>
            <p style={{ ...paragraphStyle, margin: 0 }}>
              {product.title_description?.description}
            </p>
          </div>
        )}

        <div style={{ flexShrink: 0 }}>
          <img
            src={imgUrl(product)}
            alt={product.title_description?.title}
            style={{
              maxWidth: imgMaxWidth,
              width: "100%",
              height: "auto",
              objectFit: "contain",
              pointerEvents: "none",
              ...customImageStyle,
            }}
          />
        </div>

        {isLeft && (
          <div style={{ textAlign: "left", maxWidth: 320, ...customTextStyle }}>
            <h2
              style={{
                ...productTitleStyle,
                color: "#333",
                marginBottom: 10,
              }}
            >
              {product.title_description?.title}
            </h2>
            <p style={{ ...paragraphStyle, margin: 0 }}>
              {product.title_description?.description}
            </p>
          </div>
        )}
      </div>
    );
  };

  //main return
  return (
    <>
      <div style={sectionHeadingWrapper}>
        <h1 style={{ ...headingStyle, fontSize: 52 }}>Our products</h1>
      </div>
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
        {/* <svg
          width="100%"
          height={1200}
          viewBox={`0 0 ${SVG_WIDTH} ${1200}`}
          preserveAspectRatio="xMidYMin slice"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
            zIndex: 0,
          }}
        > */}
        <svg
          width="100%"
          height={1200}
          viewBox={`0 0 ${SVG_WIDTH} 1200`}
          preserveAspectRatio="xMidYMin meet"   // ✅ IMPORTANT
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
            zIndex: 0,
          }}
        >

          <path
            d={createTopCurve()}
            fill="none"
            stroke="#d6d6d6"
            strokeWidth={3}
            strokeDasharray="6 14"
            strokeLinecap="round"
          />
          <path
            d={createMainPath()}
            fill="none"
            stroke="#d6d6d6"
            strokeWidth={3}
            strokeDasharray="6 14"
            strokeLinecap="round"
          />
        </svg>

        <div
          style={{
            maxWidth: 1400,
            margin: "-10px auto",
            position: "relative",
            zIndex: 1,
            padding: "0 28px",
            height: 1200,
          }}
        >
          {/* PRODUCT 3 at TOP position */}
          {product3 && (
            <div
              style={{
                position: "absolute",
                left: "4%",
                top: 107,
                width: "44%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 28,
              }}
            >
              <div style={{ flexShrink: 0 }}>
                <img
                  src={imgUrl(product3)}
                  alt={product3.title_description?.title}
                  style={{
                    maxWidth: is200Scale ? 180 : 220, // Reduced from 220
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    pointerEvents: "none",
                  }}
                />
              </div>
              <div
                style={{
                  textAlign: "left",
                  maxWidth: 320,
                  position: "absolute",
                  left: is200Scale ? "44%" : (isSmallScreen ? "45%" : "40%"), // Moved left for 200% scale
                  top: isSmallScreen ? "-5%" : "-10%",
                }}
              >
                <h2
                  style={{
                    ...productTitleStyle,
                    color: "#333",
                    marginBottom: 10,
                  }}
                >
                  {product3.title_description?.title}
                </h2>
                <p style={{ ...paragraphStyle, margin: 0 }}>
                  {product3.title_description?.description}
                </p>
              </div>
            </div>
          )}

          {/* PRODUCT 2 */}
          {product2 && (
            <div
              style={{
                position: "absolute",
                right: "6%",
                top: is200Scale ? 110 : 150, // Moved up to align with Product 3 (Visual #1)
                width: "44%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 28,
              }}
            >
              <div
                style={{
                  textAlign: "left",
                  maxWidth: is200Scale ? 200 : 320, // Reduced width to force wrapping ("add more lines")
                  position: "absolute",
                  bottom: is200Scale ? "10%" : "60%", // Moved down significantly
                  left: is200Scale ? "4%" : (isMacBook ? "6%" : isMediumScreen ? "-2%" : isSmallScreen ? "2%" : "8%"), // Moved way left for 200% scale
                }}
              >
                <h2
                  style={{
                    ...productTitleStyle,
                    color: "#333",
                    marginBottom: 10,
                  }}
                >
                  {product2.title_description?.title}
                </h2>
                <p style={{ ...paragraphStyle, margin: 0 }}>
                  {product2.title_description?.description}
                </p>
              </div>

              <div style={{ flexShrink: 0 }}>
                <img
                  src={imgUrl(product2)}
                  alt={product2.title_description?.title}
                  style={{
                    maxWidth: is200Scale ? 200 : 280, // Reduced further to 200
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          )}

          {/* Coco center */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 340,
              transform: "translateX(-50%)",
              width: 380,
              textAlign: "center",
              zIndex: 2,
            }}
          >
            {coco && (
              <img
                src={imgUrl(coco)}
                alt="Coco"
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: 420,
                  objectFit: "contain",
                  pointerEvents: "none",
                }}
              />
            )}
          </div>

          {/* PRODUCT 1 at BOTTOM position */}
          {product1 && (
            <div
              style={{
                position: "absolute",
                left: is200Scale && isFirefox ? "4%" : "6%",
                top: is200Scale && isFirefox ? 780 : 750,
                width: "44%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 28,
              }}
            >
              <div
                style={{
                  textAlign: "left",
                  maxWidth: 320,
                  position: "relative",
                  top: "7%",
                  left: is200Scale ? "7%" : "6%", // Removed offset for 200% scale to prevent overlap
                }}
              >
                <h2
                  style={{
                    ...productTitleStyle,
                    color: "#333",
                    marginBottom: 10,
                  }}
                >
                  {product1.title_description?.title}
                </h2>
                <p style={{ ...paragraphStyle, margin: 0 }}>
                  {product1.title_description?.description}
                </p>
              </div>

              <div style={{ flexShrink: 0 }}>
                <img
                  src={imgUrl(product1)}
                  alt={product1.title_description?.title}
                  style={{
                    maxWidth: is200Scale ? 200 : 280, // Reduced further to 200
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          )}

          {/* ✅ PRODUCT 4 - MACBOOK ADJUSTMENT */}
          {product4 && (
            <div
              style={{
                position: "absolute",
                right: is200Scale ? "12%" : "7%", // Moved Left (7% -> 12%) per correct request
                top: is200Scale ? 760 : 720, // Moved down (720 -> 760)
                width: "44%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 28,
              }}
            >
              <div
                style={{
                  textAlign: "right",
                  maxWidth: 320,
                  position: "relative",
                  left: is200Scale ? "8%" : (isMacBook ? "-2%" : "8.7%"), // Moved Text Left (-10%) to fix overlap
                }}
              >
                <h2
                  style={{
                    ...productTitleStyle,
                    color: "#333",
                    marginBottom: 10,
                  }}
                >
                  {product4.title_description?.title}
                </h2>
                <p style={{ ...paragraphStyle, margin: 0 }}>
                  {product4.title_description?.description}
                </p>
              </div>

              <div style={{ flexShrink: 0 }}>
                <img
                  src={imgUrl(product4)}
                  alt={product4.title_description?.title}
                  style={{
                    maxWidth: is200Scale ? 170 : 240, // Reduced further to 170
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          )}

          {/* ✅ PRODUCT 5 - MACBOOK ADJUSTMENT */}
          <ProductRow
            side="left"
            top={1130}
            imgMaxWidth={is200Scale ? 180 : 220} // Reduced from 220
            product={product5}
            customTextStyle={{
              position: "relative",
              top: is200Scale ? "20px" : (isMacBook ? "-10px" : "-35px"), // Moved text down for 200% scale (20px)
              left: is200Scale ? "2%" : (isMacBook ? "-3%" : "-5%"),     // ✅ MACBOOK: less left, 200%: moved right
            }}
            customImageStyle={{
              position: "relative",
              left: is200Scale ? "15px" : "0px",
            }}
          />
        </div>
      </section>
    </>
  );
};

export default OurProducts;
