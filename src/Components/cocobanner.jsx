// CocoBanner.jsx
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import cloudImg from "../cloud1.png";
import waveImage from "../cocobanner.png";

export default function CocoBanner() {
  const [data, setData] = useState(null);

  const fetchBanner = async () => {
    try {
      const res = await fetch(
        "https://correct-prize-f0a5924469.strapiapp.com/api/cocobanners?populate=*"
      );
      const resData = await res.json();
      console.log(resData.data[0]);
      setData(resData.data[0]);
    } catch (err) {
      console.error("Failed fetching CocoBanner:", err);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  if (!data) return null;

  const title = data.title;
  const description = data.description;
  const charImg = data.image?.url || null;

  return (
    <Box sx={{ position: "relative", width: "100%", height: "auto" }}>
      {/* Wave */}
      <img
        src={waveImage}
        style={{ width: "100%", display: "block", position: "relative"}}
        alt="wave"
      />

      {/* CHARACTER IMAGE - LEFT SIDE */}
      {charImg && (
        <img
          src={charImg}
          alt="character"
          style={{
            position: "absolute",
            bottom: "170px",
            left: "80px",
            zIndex: 100,
            pointerEvents: "none",
            maxWidth: "570px",
            height: "700px"
          }}
        />
      )}

      {/* MAIN CONTENT - CENTER TEXT + RIGHT CLOUD */}
      <Box
        sx={{
          position: "absolute",
          top: "520px",
          left: "58%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
          zIndex: 2,
          maxWidth: "1200px",
          width: "90%"
        }}
      >
        {/* SMALLER LEFT SPACER */}
        <Box sx={{ flex: 0.5, minWidth: "100px" }} />

        {/* STYLISH 2-LINE HEADING */}
        <Box
          sx={{
            flex: 4,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            textAlign: "center",
            color: "white",
            maxWidth: "1000px",
            width: "100%"
          }}
        >
          

          {/* STYLISH 2-LINE "Built for kids, Loved by parents" */}
          <Box sx={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            gap: "0.2rem",
            position: "relative"
          }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 1700,
                color: "white",
                fontSize: "4.5rem",
                lineHeight: "1.1",
                letterSpacing: "0.5px",
                mb: 0,
                position: "relative",
                zIndex: 3,
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
              }}
            >
              Built for kids,Loved
            </Typography>
            
            <Typography
              variant="h4"
              sx={{
                fontWeight: 1700,  // Extra bold
                color: "white !important",
                fontSize: "4.5rem",
                lineHeight: "1.1",
                letterSpacing: "-0.5px",
                mb: 0,
                position: "relative",
                zIndex: 3,
                textShadow: "3px 3px 6px rgba(0,0,0,0.4)",
                mt: "-10px"  // Overlap effect
              }}
            >
               by parents
            </Typography>
          </Box>

          {/* DESCRIPTION */}
          <Typography
            variant="body1"
            dangerouslySetInnerHTML={{ __html: description }}
            sx={{
              opacity: 0.95,
              fontWeight: 500,
              lineHeight: "30px",
              color: "white !important",
              maxWidth: "none",
              mt: 3
            }}
          />
        </Box>

        {/* RIGHT CLOUD */}
        <Box
          sx={{
            flex: 0.8,
            display: "flex",
            justifyContent: "flex-end",
            minWidth: "250px",
            position:'relative',
            right:"80px",
            bottom:"190px"
          }}
        >
          <img
            src={cloudImg}
            alt="cloud icon"
            style={{
              width: "160px",
              height: "auto",
              pointerEvents: "none"
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
