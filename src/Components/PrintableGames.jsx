import { useEffect, useState } from "react";
import './PrintableGames/PrintableGames.css'
import HoverButton from "./HoverButton/HoverButton";
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

        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: isEdge ? '18px' : '20px',
      };
    }

    return {
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '20px',
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
      <section className="pg-loading">
        <h2>
          Printable games
        </h2>
        <p>
          Loading printable games — please wait.
        </p>
      </section>
    );
  }

  return (
    <section className="pg-section" style={{
      padding: isEdge ? "0rem 1rem 4rem" : "0rem 1.5rem 4.5rem",
    }}>
      <div className="pg-border-box"
        style={{
          padding: isEdge ? "0 0.5rem" : "0 1rem",
        }}>
        <div className="pg-block"
          style={{
            marginBottom: isEdge ? "2rem" : "2.25rem",
          }}>
          <h2 style={{
            fontSize: isEdge ? "3.2rem" : "3.4rem",
          }}>
            Printable games
          </h2>
        </div>

        <div className='pg-grid' style={gridStyle}>
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
              <div key={item.id}
                className="pg-grid-item-holder" style={{
                  border: `${gridConfig.borderWidth} solid #f0f0f0`,
                  padding: gridConfig.itemPadding,
                }}>

                <div
                  className='pg-grid-item'
                  style={{
                    padding: isEdge ? "8px 6px" : "10px 8px",
                    minHeight: isEdge
                      ? (screenWidth >= 1440 ? 300 : 260)
                      : (screenWidth >= 1440 ? 320 : 280),
                  }}>
                  {thumb ? (
                    <img
                      src={thumb}
                      alt={item.name || `game-${item.id}`}
                    />
                  ) : (
                    <div style={{
                      height: isEdge
                        ? (screenWidth >= 1440 ? 260 : 220)
                        : (screenWidth >= 1440 ? 280 : 240),
                    }}>
                      No image
                    </div>
                  )}
                </div>

                <HoverButton
                  text='Download'
                  style={{padding:'10px 20px', cursor: hasPdf ? 'pointer' : 'not-allowed' }}
                  onClick={() => hasPdf && downloadPrintable(item)}
                  title={hasPdf ? 'download PDF' : 'PDF not available'} />
              </div>
            );
          })}
        </div>




        <HoverButton text='See More' />
      </div>
    </section>
  );
}