import React, { useEffect, useState } from "react";
import '../fonts.css';

export default function PrintableGames() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);
  const [showMoreHovered, setShowMoreHovered] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); // ✅ DYNAMIC WIDTH

  // ✅ RESPONSIVE WIDTH LISTENER
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const url = "https://correct-prize-f0a5924469.strapiapp.com/api/games?populate=*";
    fetch(url)
      .then((r) => r.json())
      .then((json) => {
        const data = (json && json.data) || [];
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load games:", err);
        setLoading(false);
      });
  }, []);

  // ✅ DYNAMIC GRID SIZING FOR YOUR LAPTOPS
  const getGridConfig = () => {
    if (screenWidth >= 1920) return { minWidth: '260px', paddingLeft: '12%', fontSize: '26px' }; // Good laptop
    if (screenWidth >= 1440) return { minWidth: '240px', paddingLeft: '10%', fontSize: '24px' };
    if (screenWidth >= 1200) return { minWidth: '220px', paddingLeft: '8%', fontSize: '22px' };  // Your smaller laptop
    return { minWidth: '200px', paddingLeft: '6%', fontSize: '20px' };
  };

  const gridConfig = getGridConfig();

  async function downloadPrintable(item) {
    const printable = item.printable && item.printable[0];
    if (!printable || !printable.url) return;

    try {
      setDownloadingId(item.id);
      const res = await fetch(printable.url);
      if (!res.ok) throw new Error("Network error while downloading file");
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const filename =
        printable.name ||
        printable.hash ||
        `printable-${item.id}${printable.ext || ".pdf"}`;

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed, opening in new tab:", err);
      window.open(printable.url, "_blank", "noopener");
    } finally {
      setDownloadingId(null);
    }
  }

  if (loading) {
    return (
      <section style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <h2 style={{ 
          fontSize: "2.4rem", 
          marginBottom: ".5rem",
          fontFamily: "'Kellogg's Sans', sans-serif",
          fontWeight: 700,
          color: "red"
        }}>
          Printable games
        </h2>
        <p style={{ 
          maxWidth: 880, 
          margin: "0 auto 2rem", 
          color: "#666",
          fontFamily: "'Kellogg's Sans', sans-serif",
          fontWeight: 400
        }}>
          Loading printable games — please wait.
        </p>
      </section>
    );
  }

  return (
    <section style={{ background: "#fff", padding: "4.5rem 1.5rem", overflow: "hidden" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 1rem" }}>
        {/* Heading + description (CENTERED) */}
        <div style={{ marginBottom: "2.25rem", textAlign: "center", display: "block" }}>
          <h2 style={{
              fontSize: "3.4rem",
              margin: 0,
              color: "red",
              fontFamily: "'Kellogg's Sans', sans-serif",
              fontWeight: "medium",
              letterSpacing: "0%",
            }}>
              Printable games
          </h2>
        </div>

        {/* ✅ DYNAMIC RESPONSIVE GRID */}
        <div style={{
            display: "grid",
            gridTemplateColumns: `repeat(auto-fill, minmax(${gridConfig.minWidth}, 1fr))`,
            gap: 20,
            alignItems: "stretch",
            marginBottom: "3rem"
          }}>
          {items.map((item) => {
            const thumb =
              (item.thumbnail &&
                item.thumbnail.formats &&
                item.thumbnail.formats.thumbnail &&
                item.thumbnail.formats.thumbnail.url) ||
              (item.thumbnail && item.thumbnail.url) ||
              null;
            const printable = item.printable && item.printable[0];
            const hasPdf = !!(printable && printable.url);

            return (
              <div key={item.id} style={{
                  background: "#fff",
                  border: "6px solid #f0f0f0",
                  borderRadius: 6,
                  padding: 12,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                }}>
                <div style={{
                    background: "#fff",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px 8px",
                    borderRadius: 4,
                    minHeight: screenWidth >= 1440 ? 320 : 280, // Responsive height
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
                      }}
                    />
                  ) : (
                    <div style={{
                        width: "100%",
                        height: screenWidth >= 1440 ? 280 : 240,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#aaa",
                        background: "#fafafa",
                        fontFamily: "'Kellogg's Sans', sans-serif",
                        fontWeight: 400,
                      }}>
                      No image
                    </div>
                  )}
                </div>

                {/* ✅ DYNAMIC DOWNLOAD AREA - PERFECT SPACING */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    marginTop: 18,
                    padding: `0 ${screenWidth >= 1440 ? '12px' : '8px'} 8px`,
                    gap: '4px'
                  }}>
                  <div style={{ textAlign: "left", flex: 1 }}>
                    <div style={{
                        fontSize: gridConfig.fontSize,
                        color: "#f21f4d",
                        fontWeight: 800,
                        marginBottom: 6,
                        textTransform: "capitalize",
                        fontFamily: "'Kellogg's Sans', sans-serif",
                        letterSpacing: "0%",
                        paddingLeft: gridConfig.paddingLeft,
                      }}>
                      Download
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <button
                      onClick={() => downloadPrintable(item)}
                      disabled={!hasPdf || downloadingId === item.id}
                      aria-disabled={!hasPdf || downloadingId === item.id}
                      style={{
                        width: screenWidth >= 1440 ? 56 : 50,
                        height: screenWidth >= 1440 ? 56 : 50,
                        borderRadius: "50%",
                        border: "none",
                        outline: "none",
                        cursor: hasPdf ? "pointer" : "not-allowed",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
                        background: hasPdf ? "linear-gradient(180deg,#ffb366,#ff8a2b)" : "#eee",
                        color: "#fff",
                        fontSize: screenWidth >= 1440 ? 18 : 16,
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

        {/* SEE MORE BUTTON */}
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button
            onMouseEnter={() => setShowMoreHovered(true)}
            onMouseLeave={() => setShowMoreHovered(false)}
            style={{
              background: showMoreHovered ? "#FCD34D" : "transparent",
              border: "none",
              color: "#f21f4d",
              fontSize: "1.4rem",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 24px",
              borderRadius: "50px",
              fontFamily: "'Kellogg's Sans', sans-serif",
              transition: "all 0.3s ease",
              boxShadow: showMoreHovered ? "0 8px 25px rgba(252, 211, 77, 0.4)" : "none",
              letterSpacing: "0%",
            }}
          >
            <svg
              style={{ 
                width: "24px", 
                height: "24px",
                transition: "all 0.3s ease"
              }}
              fill={showMoreHovered ? "#f21f4d" : "currentColor"}
              viewBox="0 0 24 24"
            >
              <polygon points="5,3 19,12 5,21 5,3" />
            </svg>
            See more
          </button>
        </div>
      </div>
    </section>
  );
}
