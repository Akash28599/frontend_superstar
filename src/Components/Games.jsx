import React, { useEffect, useState } from "react";

const sample = [
  { name: "Game1", thumbnail: '', printable: '/assetss/BrainGameVol1.pdf' },
  { name: "Game2", thumbnail: '', printable: '/assetss/BrainGameVol2.pdf' },
  { name: "Game3", thumbnail: '', printable: '/assetss/BrainGameVol3.pdf' },
  { name: "Game4", thumbnail: '', printable: '/assetss/BrainGameVol4.pdf' },
  { name: "Game5", thumbnail: '', printable: '/assetss/BrainGameVol5.pdf' }
];

export default function PrintableGames() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);

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
      });
  }, []);

  async function downloadPrintable(item) {
    let fileUrl = null;
    let filename = "printable.pdf";

    if (typeof item.printable === "string") {
      fileUrl = item.printable;
      filename = item.printable.split("/").pop();
    } else if (Array.isArray(item.printable) && item.printable[0]) {
      fileUrl = item.printable[0].url;
      filename = item.printable[0].name || `printable-${item.id}${item.printable[0].ext || ".pdf"}`;
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
      <section className="py-16 px-8 text-center bg-white min-h-[400px] flex flex-col items-center justify-center">
        <h2 className="text-[2.4rem] font-bold text-kelloggs-red mb-2">Printable games</h2>
        <p className="text-[#666] font-normal max-w-[880px]">Loading printable games — please wait.</p>
      </section>
    );
  }

  return (
    <section className="bg-white py-16 px-6 overflow-hidden font-kelloggs">
      <div className="w-full max-w-[1600px] mx-auto">
        
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-[3rem] tablet:text-[3.4rem] text-kelloggs-red font-medium tracking-normal leading-tight">
            Printable games
          </h2>
        </div>

        {/* Games Grid - Horizontal Scrollable Row */}
        <div className="
            flex flex-nowrap gap-6 
            overflow-x-auto 
            pb-10 pt-4 px-4
            snap-x snap-mandatory
            scrollbar-hide
            justify-start wide:justify-center
        ">
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
              <div 
                key={item.id} 
                className="
                    flex-none snap-center
                    w-[280px] tablet:w-[320px] 
                    bg-white border-[6px] border-[#f0f0f0] rounded-lg 
                    p-3 
                    flex flex-col items-center 
                    shadow-[0_4px_12px_rgba(0,0,0,0.06)]
                    group hover:shadow-lg transition-shadow duration-300
                "
              >
                {/* Image Container */}
                <div className="
                    w-full h-[260px] tablet:h-[300px] 
                    bg-white rounded flex items-center justify-center 
                    p-2 flex-shrink-0
                ">
                  {thumb ? (
                    <img
                      src={thumb}
                      alt={item.name || `game-${item.id}`}
                      className="w-full h-full object-contain block max-w-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#aaa] bg-[#fafafa] font-normal">
                      No image
                    </div>
                  )}
                </div>

                {/* Download Area */}
                <div
                  className="
                    w-full flex items-center justify-between gap-2 mt-auto relative cursor-pointer
                    py-3 px-2 rounded-[22px]
                    transition-all duration-300
                    hover:bg-kelloggs-gold/10
                  "
                  onClick={() => hasPdf && downloadPrintable(item)}
                >
                  {/* Hover Background Pill Effect */}
                  <div className="absolute inset-0 rounded-[22px] bg-transparent group-hover:bg-kelloggs-gold transition-colors duration-300 -z-0" />

                  {/* Text */}
                  <div className="text-left flex-1 min-w-0 z-10 pl-2">
                    <div className="text-[20px] tablet:text-[22px] text-kelloggs-red font-extrabold capitalize truncate">
                      Download
                    </div>
                  </div>

                  {/* Play Button */}
                  <div className="flex z-10">
                    <button
                      className={`
                        w-[46px] h-[46px] tablet:w-[50px] tablet:h-[50px]
                        rounded-full border-none outline-none flex items-center justify-center
                        text-white text-[16px] tablet:text-[18px]
                        shadow-[2px_3px_0px_#E41F35,0_6px_18px_rgba(0,0,0,0.18)]
                        transition-transform duration-300
                        ${hasPdf ? 'bg-gradient-to-b from-[#ffb366] to-[#ff8a2b] cursor-pointer group-hover:scale-110' : 'bg-[#eee] cursor-not-allowed'}
                      `}
                      disabled={!hasPdf || downloadingId === item.id}
                      title={hasPdf ? "Download printable" : "Printable not available"}
                    >
                      {downloadingId === item.id ? "..." : (
                         <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff">
                            <polygon points="8,5 8,19 19,12" />
                         </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* See More Button */}
        <div className="text-center mt-8 w-full">
          <button className="
            inline-flex items-center gap-3 
            px-7 py-3 rounded-full 
            text-kelloggs-red font-bold text-[1.4rem] 
            transition-all duration-300 
            hover:bg-kelloggs-gold 
            cursor-pointer group
          ">
            See more
            <div className="
                w-9 h-9 rounded-full 
                bg-gradient-to-b from-[#ffb366] to-[#ff8a2b] 
                flex items-center justify-center 
                shadow-[2px_3px_0px_#E41F35,0_4px_12px_rgba(0,0,0,0.1)]
                group-hover:scale-110 transition-transform duration-300
            ">
              <svg width="16" height="16" fill="#FFFFFF" viewBox="0 0 24 24">
                <polygon points="5,3 19,12 5,21 5,3" />
              </svg>
            </div>
          </button>
        </div>

      </div>
    </section>
  );
}