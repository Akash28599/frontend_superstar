import { Box, Container, Typography } from "@mui/material";
import StoryCard from "./StoryComponent";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

const COLORS = ["#F9D536", "#E21345", "#2D9CDB", "#f191e7ff"];

export default function TrendingStories() {
  const [storiesData, setStoriesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // FETCH STORIES
  useEffect(() => {
    const getStories = async () => {
      try {
        const res = await fetch(
          "https://correct-prize-f0a5924469.strapiapp.com/api/stories?populate=*"
        );
        const json = await res.json();
        setStoriesData(json);
      } catch (err) {
        setError("Failed to load stories");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getStories();
  }, []);

  // EMBLA
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    dragFree: false,
    skipSnaps: false,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (loading) return <Container sx={{ py: 6 }}>Loading stories...</Container>;
  if (error) return <Container sx={{ py: 6 }}>{error}</Container>;

  const stories = storiesData?.data ?? [];

  return (
    <Container sx={{ py: 6, textAlign: "center", position: "relative" }}>
      <Typography
        sx={{
          fontSize: "48px",
          fontWeight: 700,
          color: "#E21345",
          mb: 1,
        }}
      >
        Trending Stories
      </Typography>

      <Typography
        sx={{
          maxWidth: 750,
          mx: "auto",
          color: "#807D7E",
          fontSize: "18px",
          lineHeight: "28px",
          mb: 5,
        }}
      >
        {stories?.[0]?.description}
      </Typography>

      {/* LEFT ARROW */}
      <ChevronLeftIcon
        onClick={scrollPrev}
        style={{
          position: "absolute",
          left: 0,
          top: "65%",
          zIndex: 5,
          transform: "scale(2)",
          cursor: "pointer",
        }}
        sx={{ "&:hover": { color: "red" } }}
      />

      {/* EMBLA VIEWPORT */}
      <Box ref={emblaRef} sx={{ overflow: "hidden" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {stories.map((item, index) => (
            <Box
              key={item.id}
              sx={{
                flex: "0 0 45%",
                scrollSnapAlign: "center",
              }}
            >
              <StoryCard
                cardData={item}
                bgColor={COLORS[index % COLORS.length]}
              />
            </Box>
          ))}
        </Box>
      </Box>

      {/* RIGHT ARROW */}
      <ChevronRightIcon
        onClick={scrollNext}
        style={{
          position: "absolute",
          right: 0,
          top: "65%",
          zIndex: 5,
          transform: "scale(2)",
          cursor: "pointer",
        }}
        sx={{ "&:hover": { color: "red" } }}
      />
    </Container>
  );
}
