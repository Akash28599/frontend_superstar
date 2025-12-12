import React, { useEffect, useState, useRef } from "react";

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

  const fallback = products[0] || null;

  const top = products[0] ? [products[0]] : fallback ? [fallback] : [];
  const leftOfCoco = products[1] || fallback;
  const rightOfCoco = products[2] || fallback;
  let remaining = products.slice(3);

  const MAX_ROWS = 10;
  const usedRows = (top.length > 0 ? 1 : 0) + 1;
  const maxRemainingRows = Math.max(0, MAX_ROWS - usedRows);
  remaining = remaining.slice(0, maxRemainingRows);

  const ROW_SPACING = 220;
  const ROW_COUNT = MAX_ROWS;
  const leftX = Math.round(containerWidth * 0.38);
  const rightX = Math.round(containerWidth * 0.72);
  const midX = containerWidth / 2;
  const startY = 400;
  const rowYs = Array.from(
    { length: ROW_COUNT },
    (_, i) => startY + i * ROW_SPACING
  );

  const buildZigZagPath = () => {
    if (!rowYs.length) return "";
    let d = `M ${leftX} ${rowYs[0].toFixed(0)}`;
    const cpOffsetX = Math.max(260, containerWidth * 0.28);
    const cpVerticalFactor = 0.42;

    for (let i = 1; i < rowYs.length; i++) {
      const prevY = rowYs[i - 1];
      const y = rowYs[i];
      const goingToRight = i % 2 === 1;
      const cp1x = midX + (goingToRight ? -cpOffsetX : cpOffsetX);
      const cp1y = prevY + ROW_SPACING * cpVerticalFactor;
      const cp2x = midX + (goingToRight ? -cpOffsetX * 0.25 : cpOffsetX * 0.25);
      const cp2y = y - ROW_SPACING * cpVerticalFactor;
      const targetX = goingToRight ? rightX : leftX;
      d += ` C ${Math.round(cp1x)} ${Math.round(cp1y)} ${Math.round(
        cp2x
      )} ${Math.round(cp2y)} ${Math.round(targetX)} ${Math.round(y)}`;
    }
    return d;
  };

  const SVG_H = rowYs[rowYs.length - 1] + 420;
  const pathD = buildZigZagPath();

  const imgUrl = (it) =>
    it?.image?.url ||
    it?.image?.formats?.large?.url ||
    it?.image?.formats?.medium?.url ||
    it?.image?.formats?.thumbnail?.url ||
    "";

  const headingStyle = {
    fontFamily: "'Baloo 2', system-ui, sans-serif",
    color: "#F60945",
    fontWeight: 900,
    lineHeight: 1.05,
    margin: 0,
  };
  const sectionHeadingWrapper = {
    maxWidth: 1400,
    margin: "0 auto 28px",
    padding: "0 28px",
    textAlign: "center",
  };
  const paragraphStyle = {
    fontSize: 18,
    lineHeight: 1.7,
    color: "#4b4b4b",
    marginTop: 12,
    maxWidth: 360,
  };
  const productTitleStyle = {
    fontFamily: "'Baloo 2', system-ui, sans-serif",
    fontWeight: 800,
    lineHeight: 1.1,
    margin: 0,
  };

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        background: "#fff",
        overflow: "hidden",
        padding: "2rem 0 4rem",
      }}
    >
      {/* dashed path */}
      <svg
        width="100%"
        height={SVG_H}
        viewBox={`0 0 ${containerWidth} ${SVG_H}`}
        preserveAspectRatio="xMinYMin slice"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <path
          d={pathD}
          fill="none"
          stroke="#d6d6d6"
          strokeWidth={4}
          strokeDasharray="8 10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          padding: "0 28px",
        }}
      >
        {/* heading */}
        <div style={sectionHeadingWrapper}>
          <h1 style={{ ...headingStyle, fontSize: 40 }}>Our products</h1>
        </div>

        {/* TOP ROW: image left, text tight on the right */}
        {top.length > 0 && top[0] && (
          <div style={{ marginBottom: ROW_SPACING - 40 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14, // controls distance between image and text
              }}
            >
              <div style={{ flexShrink: 0 }}>
                <img
                  src={imgUrl(top[0])}
                  alt={top[0].title_description?.title || "product"}
                  style={{
                    maxWidth: 420,
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    pointerEvents: "none",
                  }}
                />
              </div>
              <div style={{ maxWidth: 420 ,
                transform: "translateX(80px)" ,
                transform:"translateY(50px)"
              }}>
                <h2
                  style={{
                    ...productTitleStyle,
                    fontSize: 42,
                    color: "#333",
                    marginBottom: 8,
                  }}
                >
                  {top[0].title_description?.title || "Product"}
                </h2>
                <p style={paragraphStyle}>
                  {top[0].title_description?.description || ""}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* MIDDLE GROUP */}
        {(leftOfCoco || coco || rightOfCoco) && (
          <div style={{ marginBottom: ROW_SPACING - 10, marginTop: 40 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1.2fr) 340px minmax(0, 1.2fr)",
                gap: 40,
                alignItems: "center",
              }}
            >
              {/* Left block */}
              <div style={{ display: "flex", gap: 28, alignItems: "flex-end" }}>
                <div style={{ transform: "translate(40px,-190px)"}}>
                  <h2
                    style={{
                      ...productTitleStyle,
                      fontSize: 40,
                      color: "#333",
                      marginBottom: 12,
                    }}
                  >
                    {leftOfCoco?.title_description?.title || ""}
                  </h2>
                  <p style={paragraphStyle}>
                    {leftOfCoco?.title_description?.description || ""}
                  </p>
                </div>
                <img
                  src={imgUrl(leftOfCoco)}
                  alt={leftOfCoco?.title_description?.title || "left"}
                  style={{
                    maxHeight: 340,
                    width: "auto",
                    objectFit: "contain",
                    pointerEvents: "none",
                  }}
                />
              </div>

              {/* Coco center */}
              <div
                style={{
                  textAlign: "center",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                {coco && (
                  <img
                    src={imgUrl(coco)}
                    alt="coco"
                    style={{
                      maxHeight: 520,
                      width: "auto",
                      objectFit: "contain",
                      marginBottom: -40,
                      pointerEvents: "none",
                    }}
                  />
                )}
              </div>

              {/* Right block */}
              <div
                style={{
                  display: "flex",
                  gap: 28,
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                <img
                  src={imgUrl(rightOfCoco)}
                  alt={rightOfCoco?.title_description?.title || "right"}
                  style={{
                    maxHeight: 340,
                    width: "auto",
                    objectFit: "contain",
                    pointerEvents: "none",
                  }}
                />
                <div style={{ textAlign: "right" }}>
                  <h2
                    style={{
                      ...productTitleStyle,
                      fontSize: 40,
                      color: "#333",
                      marginBottom: 12,
                    }}
                  >
                    {rightOfCoco?.title_description?.title || ""}
                  </h2>
                  <p
                    style={{
                      ...paragraphStyle,
                      marginLeft: "auto",
                    }}
                  >
                    {rightOfCoco?.title_description?.description || ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* REMAINING ROWS */}
        {remaining.map((product, idx) => {
          const globalRowIndex = 2 + idx;
          const isImageLeft = globalRowIndex % 2 === 0;
          return (
            <div key={product.id || idx} style={{ marginBottom: ROW_SPACING - 40 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1.1fr)",
                  gap: 48,
                  alignItems: "center",
                }}
              >
                <div style={{ textAlign: "center", order: isImageLeft ? 0 : 1 }}>
                  <img
                    src={imgUrl(product) || imgUrl(fallback)}
                    alt={product.title_description?.title || "product"}
                    style={{
                      maxWidth: 420,
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                      pointerEvents: "none",
                    }}
                  />
                </div>

                <div
                  style={{
                    paddingTop: 4,
                    direction: "ltr",
                    order: isImageLeft ? 1 : 0,
                  }}
                >
                  <h3
                    style={{
                      ...productTitleStyle,
                      fontSize: 34,
                      color: "#333",
                    }}
                  >
                    {product.title_description?.title || ""}
                  </h3>
                  <p style={paragraphStyle}>
                    {product.title_description?.description || ""}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OurProducts;
