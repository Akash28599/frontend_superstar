import React, { useEffect, useState } from "react";

export default function PrintableGames() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);
  const [showMoreHovered, setShowMoreHovered] = useState(false);

  useEffect(() => {
    const url =
      "https://correct-prize-f0a5924469.strapiapp.com/api/games?populate=*";
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
        <h2 style={{ fontSize: "2.4rem", marginBottom: ".5rem" }}>
          Printable games
        </h2>
        <p style={{ maxWidth: 880, margin: "0 auto 2rem", color: "#666" }}>
          Loading printable games — please wait.
        </p>
      </section>
    );
  }

  return (
    <section
      style={{
        background: "#fff",
        padding: "4.5rem 1.5rem",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 1rem",
        }}
      >
        {/* Heading + description (CENTERED) */}
        <div
          style={{
            marginBottom: "2.25rem",
            textAlign: "center",
            display: "block",
          }}
        >
          <h2
            style={{
              fontSize: "3rem",
              margin: 0,
              fontWeight: 800,
              color: "red",
              fontFamily: "'Baloo 2', system-ui, sans-serif",
            }}
          >
            Printable games
          </h2>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 20,
            alignItems: "stretch",
            marginBottom: "3rem" // Added space for See More button
          }}
        >
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
              <div
                key={item.id}
                style={{
                  background: "#fff",
                  border: "6px solid #f0f0f0",
                  borderRadius: 6,
                  padding: 12,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  style={{
                    background: "#fff",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px 8px",
                    borderRadius: 4,
                    minHeight: 320,
                  }}
                >
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
                    <div
                      style={{
                        width: "100%",
                        height: 280,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#aaa",
                        background: "#fafafa",
                      }}
                    >
                      No image
                    </div>
                  )}
                </div>

                {/* Download area */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    marginTop: 18,
                    padding: "0 8px 8px",
                  }}
                >
                  <div style={{ textAlign: "left" }}>
                    <div
                      style={{
                        fontSize: 26,
                        color: "#f21f4d",
                        fontWeight: 800,
                        marginBottom: 6,
                        textTransform: "capitalize",
                      }}
                    >
                      Download
                    </div>
                    <div style={{ color: "#888", fontSize: 14 }}>
                      {hasPdf ? printable.name : "Not available"}
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <button
                      onClick={() => downloadPrintable(item)}
                      disabled={!hasPdf || downloadingId === item.id}
                      aria-disabled={!hasPdf || downloadingId === item.id}
                      style={{
                        width: 56,
                        height: 56,
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
                        fontSize: 18,
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
              fontFamily: "'Baloo 2', system-ui, sans-serif",
              transition: "all 0.3s ease",
              boxShadow: showMoreHovered ? "0 8px 25px rgba(252, 211, 77, 0.4)" : "none"
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
