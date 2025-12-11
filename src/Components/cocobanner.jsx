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
        style={{ width: "100%", display: "block", position: "relative" }}
        alt="wave"
      />

      {/* Character - MOVED TO LEFT SIDE */}
      {charImg && (
        <img
          src={charImg}
          alt="character"
          style={{
            position: "absolute",
            bottom: "150px",
            left: "80px",        // Changed from default right positioning
            zIndex: 2,
            pointerEvents: "none",
            maxWidth: "400px",   // Added to control size
            height: "auto",
            zindex:100
          }}
        />
      )}

      {/* Cloud 1 - MOVED TO LEFT SIDE */}
      <img
        src={cloudImg}
        alt="cloud"
        style={{
          position: "absolute",
          top: "220px",
          left: "200px",       // Changed from right: "180px"
          zIndex: 1,
          pointerEvents: "none",
          width: "120px",      // Added size control
          height: "auto"
        }}
      />

      {/* Cloud 2 - MOVED TO LEFT SIDE */}
      <img
        src={cloudImg}
        alt="cloud"
        style={{
          position: "absolute",
          bottom: "110px",
          left: "60px",        // Changed from left: "30px" to more spaced
          zIndex: 1,
          pointerEvents: "none",
          width: "100px",      // Added size control
          height: "auto"
        }}
      />

      {/* TEXT BOX - MOVED TO RIGHT SIDE for balance */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          position: "absolute",
          top: "390px",
          right: "330px",      // Changed from left: "330px" to right side
          textAlign: "center",
          color: "white",
          textWrap: "wrap",
          zIndex: 2,
          maxWidth: "500px"    // Added to prevent text overflow
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: 800, mb: 2, maxWidth: 500 }}
        >
          {title}
        </Typography>

        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{ __html: description }}
          sx={{
            opacity: 0.95,
            fontWeight: 400,
            maxWidth: 500,
            lineHeight: "30px",
          }}
        />
      </Box>
    </Box>
  );
}
