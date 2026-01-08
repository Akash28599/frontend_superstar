import React, { useEffect, useState } from "react";

// ✅ Detect if the browser is Edge
const isEdgeBrowser = () => {
  return navigator.userAgent.includes("Edg") ||
    navigator.userAgent.includes("Edge");
};

export default function PrintableGames() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);
  const [showMoreHovered, setShowMoreHovered] = useState(false);
  const [hoveredDownloadId, setHoveredDownloadId] = useState(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const isEdge = isEdgeBrowser();

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const sample = [
    {
      name: "Game1",
      thumbnail: '',
      printable: '/assetss/BrainGameVol1.pdf',
    },
    {
      name: "Game2",
      thumbnail: '',
      printable: '/assetss/BrainGameVol2.pdf',
    },
    {
      name: "Game3",
      thumbnail: '',
      printable: '/assetss/BrainGameVol3.pdf',
    },
    {
      name: "Game4",
      thumbnail: '',
      printable: '/assetss/BrainGameVol4.pdf',
    },
    {
      name: "Game5",
      thumbnail: '',
      printable: '/assetss/BrainGameVol5.pdf',
    }
  ]


  useEffect(() => {
    const url = `${process.env.REACT_APP_STRAPI_URL}/api/games?populate=*`;

    fetch(url)
      .then((r) => r.json())
      .then((json) => {
        const data = json?.data ?? [];

        const dataWithPrintable = data.map((item) => {
          if (!item.printable) {
            const fallback = sample.find((s) => s.name === item.name);

            return {
              ...item,
              printable: fallback?.printable || null,
            };
          }

          return item;
        });
        setItems(dataWithPrintable);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load games:", err);
        setLoading(false);
      })
      .finally(
    );
  }, []);
  const constants = { gold: "#f3c720", red: "#dd2120", font: '"KelloggsSans", Arial, sans-serif' }
  const getGridConfig = () => {
    if (screenWidth >= 1920) {
      return {
        minWidth: isEdge ? '250px' : '260px',
        paddingLeft: isEdge ? '10%' : '12%',
        fontSize: isEdge ? '24px' : '26px',
        itemPadding: isEdge ? '10px' : '12px',
        borderWidth: isEdge ? '5px' : '6px'
      };
    }
    if (screenWidth >= 1440) {
      return {
        minWidth: isEdge ? '230px' : '240px',
        paddingLeft: isEdge ? '8%' : '10%',
        fontSize: isEdge ? '22px' : '24px',
        itemPadding: isEdge ? '10px' : '12px',
        borderWidth: isEdge ? '5px' : '6px'
      };
    }
    if (screenWidth >= 1200) {
      return {
        minWidth: isEdge ? '210px' : '220px',
        paddingLeft: isEdge ? '6%' : '8%',
        fontSize: isEdge ? '20px' : '22px',
        itemPadding: isEdge ? '8px' : '12px',
        borderWidth: isEdge ? '4px' : '6px'
      };
    }
    return {
      minWidth: '200px',
      paddingLeft: '6%',
      fontSize: '20px',
      itemPadding: '12px',
      borderWidth: '6px'
    };
  };

  const gridConfig = getGridConfig();

  const getGridStyle = () => {
    if (screenWidth >= 1200) {
      const columns = 5;
      return {
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: isEdge ? '18px' : '20px',
        marginBottom: '3rem',
        justifyItems: 'stretch',
        alignItems: 'stretch'
      };
    }

    return {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '20px',
      marginBottom: '3rem',
      justifyItems: 'stretch',
      alignItems: 'stretch'
    };
  };

  const gridStyle = getGridStyle();
  async function downloadPrintable(item) {
    let fileUrl = null;
    let filename = "printable.pdf";

    // Case 1: public folder string (your assetss PDFs)
    if (typeof item.printable === "string") {
      fileUrl = item.printable;
      filename = item.printable.split("/").pop();
    }

    // Case 2: Strapi media array
    else if (Array.isArray(item.printable) && item.printable[0]) {
      fileUrl = item.printable[0].url;
      filename =
        item.printable[0].name ||
        `printable-${item.id}${item.printable[0].ext || ".pdf"}`;
    }

    if (!fileUrl) return;

    setDownloadingId(item.id);

    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = filename;
    a.target = "_self";
    document.body.appendChild(a);
    a.click();
    a.remove();

    setDownloadingId(null);
  }

  if (loading) {
    return (
      <section style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <h2 style={{
          fontSize: "2.4rem",
          marginBottom: ".5rem",
          fontWeight: 700,
          color: "red"
        }}>
          Printable games
        </h2>
        <p style={{
          maxWidth: 880,
          margin: "0 auto 2rem",
          color: "#666",
          fontWeight: 400
        }}>
          Loading printable games — please wait.
        </p>
      </section>
    );
  }

  return (
    <section style={{
      background: "#fff",
      padding: isEdge ? "0rem 1rem 4rem" : "0rem 1.5rem 4.5rem",
      overflow: "hidden"
    }}>
      <div style={{
        maxWidth: 1400,
        margin: "0 auto",
        padding: isEdge ? "0 0.5rem" : "0 1rem",
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{
          marginBottom: isEdge ? "2rem" : "2.25rem",
          textAlign: "center",
          display: "block"
        }}>
          <h2 style={{
            fontSize: isEdge ? "3.2rem" : "3.4rem",
            margin: 0,
            color: "red",
            fontWeight: "medium",
            letterSpacing: "0%",
          }}>
            Printable games
          </h2>
        </div>

        <div style={gridStyle}>
          {items.map((item) => {
            const thumb =
              (item.thumbnail &&
                item.thumbnail.formats &&
                item.thumbnail.formats.thumbnail &&
                item.thumbnail.formats.thumbnail.url) ||
              (item.thumbnail && item.thumbnail.url) ||
              null;
            const printable = item.printable && item.printable[0];
            const hasPdf = !!(printable || printable.url);

            return (
              <div key={item.id} style={{
                background: "#fff",
                border: `${gridConfig.borderWidth} solid #f0f0f0`,
                borderRadius: 6,
                padding: gridConfig.itemPadding,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                boxSizing: "border-box",
                width: '100%',
                height: '100%',
                minHeight: 0,
                overflow: 'hidden',
                position: 'relative',
              }}>

                <div style={{
                  background: "#fff",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: isEdge ? "8px 6px" : "10px 8px",
                  borderRadius: 4,
                  minHeight: isEdge
                    ? (screenWidth >= 1440 ? 300 : 260)
                    : (screenWidth >= 1440 ? 320 : 280),
                  flexShrink: 0,
                }}>
                  {thumb ? (
                    <img
                      src={thumb}
                      alt={item.name || `game-${item.id}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        display: "block",
                        maxWidth: '100%',
                      }}
                    />
                  ) : (
                    <div style={{
                      width: "100%",
                      height: isEdge
                        ? (screenWidth >= 1440 ? 260 : 220)
                        : (screenWidth >= 1440 ? 280 : 240),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#aaa",
                      background: "#fafafa",
                      fontWeight: 400,
                    }}>
                      No image
                    </div>
                  )}
                </div>

                {/* ✅ Download Area - Yellow background appears on hover with rounded corners */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    marginTop: 18,
                    padding: `${isEdge ? '14px' : '18px'} ${isEdge ? '6px' : (screenWidth >= 1440 ? '12px' : '8px')}`,
                    gap: '4px',
                    flexShrink: 0,
                    position: 'relative',
                    cursor: 'pointer',
                    height: '60px', // Fixed height for consistent hover area
                  }}
                  onMouseEnter={() => setHoveredDownloadId(item.id)}
                  onMouseLeave={() => setHoveredDownloadId(null)}
                  onClick={() => hasPdf && downloadPrintable(item)}
                >
                  {/* ✅ Yellow background with reduced height and rounded corners */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    right: 0,
                    height: '62px', // Reduced height
                    transform: 'translateY(-50%)',
                    background: hoveredDownloadId === item.id ? constants.gold : 'transparent',
                    borderRadius: '22px', // Half of height for pill shape
                    transition: 'all 0.3s ease',
                    zIndex: 1,
                  }} />

                  <div style={{
                    textAlign: "left",
                    flex: 1,
                    minWidth: 0,
                    position: 'relative',
                    zIndex: 2,
                  }}>
                    <div style={{
                      fontSize: gridConfig.fontSize,
                      color: constants.red,
                      fontWeight: 800,
                      marginBottom: isEdge ? 4 : 6,
                      textTransform: "capitalize",
                      letterSpacing: "0%",
                      paddingLeft: gridConfig.paddingLeft,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      Download
                    </div>
                  </div>

                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: isEdge ? 8 : 10,
                    flexShrink: 0,
                    position: 'relative',
                    zIndex: 2,
                  }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadPrintable(item);
                      }}
                      disabled={!hasPdf || downloadingId === item.id}
                      aria-disabled={!hasPdf || downloadingId === item.id}
                      style={{
                        width: isEdge
                          ? (screenWidth >= 1440 ? 52 : 46)
                          : (screenWidth >= 1440 ? 56 : 50),
                        height: isEdge
                          ? (screenWidth >= 1440 ? 52 : 46)
                          : (screenWidth >= 1440 ? 56 : 50),
                        border: "none",
                        borderRadius: "50%",
                        outline: "none",
                        cursor: hasPdf ? "pointer" : "not-allowed",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: hasPdf ? `2px 3px 0px ${constants.red}, 0 6px 18px rgba(0,0,0,0.18)` : "none",
                        background: hasPdf ? "linear-gradient(180deg,#ffb366,#ff8a2b)" : "#eee",
                        color: "#fff",
                        fontSize: isEdge
                          ? (screenWidth >= 1440 ? 16 : 14)
                          : (screenWidth >= 1440 ? 18 : 16),
                        flexShrink: 0,
                        transition: 'all 0.3s ease',
                        transform: hoveredDownloadId === item.id ? 'scale(1.05)' : 'scale(1)',
                      }}
                      title={hasPdf ? "Download printable" : "Printable not available"}
                    >
                      {downloadingId === item.id ? "..." : "▶"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ✅ SEE MORE BUTTON */}
        <div style={{
          textAlign: "center",
          marginTop: isEdge ? "1.5rem" : "2rem",
          width: '100%',
        }}>
          <button
            onMouseEnter={() => setShowMoreHovered(true)}
            onMouseLeave={() => setShowMoreHovered(false)}
            style={{
              background: showMoreHovered ? constants.gold : 'transparent',
              border: "none",
              color: constants.red,
              fontSize: isEdge ? "1.3rem" : "1.4rem",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: isEdge ? "10px" : "12px",
              padding: isEdge ? "10px 24px" : "12px 28px",
              borderRadius: "50px",
              fontFamily: constants.font,
              transition: "all 0.3s ease",
              letterSpacing: "0%",
              position: 'relative',
              margin: '0 auto',
            }}
          >
            See more

            <div style={{
              width: isEdge ? "32px" : "36px",
              height: isEdge ? "32px" : "36px",
              borderRadius: "50%",
              background: "linear-gradient(180deg,#ffb366,#ff8a2b)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `2px 3px 0px ${constants.red}, 0 4px 12px rgba(0,0,0,0.1)`,
              flexShrink: 0,
              transition: "all 0.3s ease",
              transform: showMoreHovered ? 'scale(1.05)' : 'scale(1)',
            }}>
              <svg
                style={{
                  width: isEdge ? "14px" : "16px",
                  height: isEdge ? "14px" : "16px",
                  transition: "all 0.3s ease"
                }}
                fill="#FFFFFF"
                viewBox="0 0 24 24"
              >
                <polygon points="5,3 19,12 5,21 5,3" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}