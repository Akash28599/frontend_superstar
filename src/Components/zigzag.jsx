import React, { useEffect, useState } from "react";

const OurProducts = () => {
  const [products, setProducts] = useState([]);
  const [coco, setCoco] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch("https://correct-prize-f0a5924469.strapiapp.com/api/ourproducts?populate=*")
      .then((r) => r.json())
      .then((json) => {
        if (!mounted) return;
        const data = json.data || [];
        setCoco(data.find((it) => !it.title_description) || null);
        setProducts(data.filter((it) => it.title_description));
      })
      .catch(console.error)
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>;

  const top = products[0] ? [products[0]] : [];
  const leftOfCoco = products[1] || null;
  const rightOfCoco = products[2] || null;
  const remaining = products.slice(3);

  const ROW_SPACING = 220;
  const ROW_COUNT = 12;
  const leftX = 190;
  const rightX = 1280;
  const midX = 700;

  const rowYs = Array.from({ length: ROW_COUNT }, (_, i) => 140 + i * ROW_SPACING);

  // Improved smoother, rounded zig-zag path
  const buildZigZagPath = () => {
    let d = `M ${leftX} ${rowYs[0].toFixed(0)}`;

    rowYs.forEach((y, i) => {
      if (i === 0) return;

      const isLeftToRight = i % 2 === 0;

      // Wider control points offset horizontally from midX by 150px for more rounded arcs
      const controlX1 = isLeftToRight ? midX - 450 : midX + 450;
      const controlX2 = isLeftToRight ? midX - 150 : midX + 150;

      // Vertically position control points to smooth the curve flow
      const cpY1 = rowYs[i - 1] + ROW_SPACING * 0.4;
      const cpY2 = y - ROW_SPACING * 0.4;

      if (isLeftToRight) {
        d += ` C ${controlX1} ${cpY1.toFixed(0)} ${controlX2} ${cpY2.toFixed(0)} ${leftX} ${y.toFixed(0)}`;
      } else {
        d += ` C ${controlX1} ${cpY1.toFixed(0)} ${controlX2} ${cpY2.toFixed(0)} ${rightX} ${y.toFixed(0)}`;
      }
    });

    return d;
  };

  const SVG_H = rowYs[rowYs.length - 1] + 400;
  const pathD = buildZigZagPath();

  const imgUrl = (it) =>
    it?.image?.url || it?.image?.formats?.thumbnail?.url || "";

  const headingStyle = {
    fontFamily: "'Baloo 2', system-ui, sans-serif",
    color: "#333",
    fontWeight: 800,
    lineHeight: 1.1,
    margin: 0,
  };
  const paragraphStyle = {
    fontSize: 18,
    lineHeight: 1.7,
    color: "#4b4b4b",
    marginTop: 12,
    maxWidth: 520,
  };

  return (
    <section
      style={{
        position: "relative",
        background: "#fff",
        overflow: "hidden",
        padding: "2rem 0 4rem",
      }}
    >
      {/* Zig-zag line SVG */}
      <svg
        width="100%"
        height={SVG_H}
        viewBox={`0 0 1400 ${SVG_H}`}
        preserveAspectRatio="xMidYMid slice"
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
          stroke="#d2d2d2"
          strokeWidth={3}
          strokeDasharray="8 8"
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
        }}
      >
        {/* Top row */}
        {top.length > 0 && (
          <div style={{ marginBottom: ROW_SPACING - 60 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 48,
                alignItems: "center",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <img
                  src={imgUrl(top[0])}
                  alt={top[0].title_description.title}
                  style={{
                    maxWidth: 420,
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div>
                <h2 style={{ ...headingStyle, fontSize: 42 }}>
                  {top[0].title_description.title}
                </h2>
                <p style={paragraphStyle}>
                  {top[0].title_description.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Middle row with images and text for left, center, right */}
        {(leftOfCoco || coco || rightOfCoco) && (
          <div style={{ marginBottom: ROW_SPACING - 60 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 280px 1fr",
                gap: 32,
                alignItems: "center",
                padding: "0 12px",
              }}
            >
              {leftOfCoco ? (
                <div style={{ textAlign: "center", paddingRight: 12 }}>
                  <img
                    src={imgUrl(leftOfCoco)}
                    alt={leftOfCoco.title_description.title}
                    style={{
                      maxHeight: 360,
                      maxWidth: 280,
                      width: "auto",
                      objectFit: "contain",
                      marginBottom: 12,
                    }}
                  />
                  <h2 style={{ ...headingStyle, fontSize: 32 }}>
                    {leftOfCoco.title_description.title}
                  </h2>
                  <p style={paragraphStyle}>
                    {leftOfCoco.title_description.description}
                  </p>
                </div>
              ) : (
                <div />
              )}

              {coco ? (
                <div style={{ textAlign: "center" }}>
                  <img
                    src={imgUrl(coco)}
                    alt="coco"
                    style={{
                      maxHeight: 360,
                      maxWidth: 280,
                      width: "auto",
                      objectFit: "contain",
                      marginBottom: 12,
                    }}
                  />
                  {/* Coco typically has no title/description */}
                </div>
              ) : (
                <div />
              )}

              {rightOfCoco ? (
                <div style={{ textAlign: "center", paddingLeft: 12 }}>
                  <img
                    src={imgUrl(rightOfCoco)}
                    alt={rightOfCoco.title_description.title}
                    style={{
                      maxHeight: 360,
                      maxWidth: 280,
                      width: "auto",
                      objectFit: "contain",
                      marginBottom: 12,
                    }}
                  />
                  <h2 style={{ ...headingStyle, fontSize: 32 }}>
                    {rightOfCoco.title_description.title}
                  </h2>
                  <p style={paragraphStyle}>
                    {rightOfCoco.title_description.description}
                  </p>
                </div>
              ) : (
                <div />
              )}
            </div>
          </div>
        )}

        {/* Remaining products with alternating zig-zag alignment */}
        {remaining.map((product, idx) => {
          const globalRowIndex = 2 + idx;
          const isLeftImage = globalRowIndex % 2 === 0;

          return (
            <div
              key={product.id || product.documentId || idx}
              style={{ marginBottom: ROW_SPACING - 60 }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 48,
                  alignItems: "center",
                  direction: isLeftImage ? "ltr" : "rtl",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <img
                    src={imgUrl(product)}
                    alt={product.title_description?.title || "product"}
                    style={{
                      maxWidth: 420,
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div style={{ paddingTop: 4, direction: "ltr" }}>
                  <h3 style={{ ...headingStyle, fontSize: 34 }}>
                    {product.title_description.title}
                  </h3>
                  <p style={paragraphStyle}>
                    {product.title_description.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Filler rows for additional empty slots */}

      </div>
    </section>
  );
};

export default OurProducts;
