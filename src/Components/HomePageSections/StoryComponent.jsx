import { Paper, Typography, Box, Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

function StoryCard({ cardData, bgColor }) {
  return (
    <Paper
      sx={{
        width: 500,
        height: 300,
        display: "flex",
        alignItems: "center",
        background: bgColor,
        borderRadius: "20px",
        p: 3,
        boxSizing: "border-box",
      }}
      elevation={3}
    >
      {/* IMAGE */}
      <Box
        sx={{
          width: 180,
          height: "100%",
          background: "#ffffff",
          borderRadius: "12px",
          p: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0px 4px 15px rgba(255,255,255,0.4)",
        }}
      >
        <img
          src={cardData.thumbnail.url}
          alt={cardData.story_title}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "8px",
            objectFit: "cover",
          }}
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          pl: 3,
        }}
      >
        <Typography
          sx={{
            color: " #2A2F2F",
            fontSize: "15px",
            lineHeight: "22px",
            mb: 3,
            textAlign: "left",
            width: 250,
          }}
        >
          {cardData.story_description}
        </Typography>

        <Button
          endIcon={<PlayArrowIcon sx={{ color: "#F88B2F" }} />}
          sx={{
            background: "#ffffff",
            color: "#E21345",
            fontSize: "16px",
            borderRadius: "30px",
            textTransform: "none",
            fontWeight: 600,
            width: "170px",
            py: 1,
            alignSelf: "flex-start",
            "&:hover": {
              background: "#fff",
              boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
            },
          }}
        >
          Play Now
        </Button>
      </Box>
    </Paper>
  );
}

export default StoryCard;
