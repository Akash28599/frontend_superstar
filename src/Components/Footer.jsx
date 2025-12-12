import { Box, Grid, IconButton, List, ListItem } from "@mui/material";
import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import { BiLogoTiktok } from "react-icons/bi";
import { useEffect, useState } from "react";

const FooterLayout = () => {
  const [settingsData, setSettingsData] = useState(null);

  useEffect(() => {
    const getFooterData = async () => {
      try {
        const res = await fetch(
          "https://correct-prize-f0a5924469.strapiapp.com/api/sitesettings?populate=*"
        );
        const json = await res.json();
        console.log(json);
        setSettingsData(json);
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };
    getFooterData();
  }, []);

  const settings = settingsData?.data?.[0];

  const openUrl = (url) => {
    if (url) window.open(url, "_blank");
  };

  // Address split safely
  const addressLines = settings?.address?.split("\n") ?? [];

  return (
    <Box>
      <Box sx={{ background: "#F60945" }}>
        <Box sx={{ p: 10, display: "flex", justifyContent: "space-between" }}>
          {/* LOGO */}
          {settings?.logo?.url ? (
            <img
              src={settings.logo.url}
              alt={settings.sitename}
              style={{
                width: "20%",
                height: "20%",
                borderRadius: "8px",
                objectFit: "cover",
                padding: "10px",
              }}
            />
          ) : (
            <Box
              sx={{
                width: "20%",
                height: "20%",
                background: "#fff3",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
                fontSize: "18px",
                p: 2,
              }}
            >
              No Logo
            </Box>
          )}

          <Grid
            container
            sx={{
              mr: 10,
              fontWeight: 400,
              fontSize: "28.58px",
              lineHeight: "217%",
              color: "#fff",
            }}
            spacing={10}
          >
            <Grid>
              Company
              <List sx={{ fontSize: "18px", lineHeight: "217%" }}>
                <ListItem>About Us</ListItem>
                <ListItem>Our Blog</ListItem>
                <ListItem>Collaboration</ListItem>
              </List>
            </Grid>

            <Grid>
              More Info
              <List sx={{ fontSize: "18px", lineHeight: "217%" }}>
                <ListItem>Terms and Conditions</ListItem>
                <ListItem>Privacy Policy</ListItem>
                <ListItem>Sitemap</ListItem>
              </List>
            </Grid>

            <Grid>
              Location
              <List sx={{ fontSize: "18px", lineHeight: "217%" }}>
                <ListItem>{settings?.contactemail ?? "—"}</ListItem>
                <ListItem>{addressLines[0] ?? "—"}</ListItem>
                <ListItem>{addressLines[1] ?? ""}</ListItem>
              </List>
            </Grid>
          </Grid>
        </Box>

        {/* SOCIAL ICONS */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: 1,
            p: "0 20% 2% 20%",
          }}
        >
          <IconButton
            sx={{
              borderRadius: 2,
              background: "#fff",
              "&:hover": { background: "#e2e2e2" },
            }}
            onClick={() => openUrl(settings?.facebookurl)}
          >
            <Facebook sx={{ color: "#111" }} />
          </IconButton>

          <IconButton
            sx={{
              borderRadius: 2,
              background: "#fff",
              "&:hover": { background: "#e2e2e2" },
            }}
            onClick={() => openUrl(settings?.instagramurl)}
          >
            <Instagram sx={{ color: "#111" }} />
          </IconButton>

          <IconButton
            sx={{
              borderRadius: 2,
              background: "#fff",
              "&:hover": { background: "#e2e2e2" },
            }}
            onClick={() => openUrl(settings?.twitterurl)}
          >
            <Twitter sx={{ color: "#111" }} />
          </IconButton>

          <IconButton
            sx={{
              borderRadius: 2,
              background: "#fff",
              "&:hover": { background: "#e2e2e2" },
            }}
            onClick={() => openUrl(settings?.youtubeurl)}
          >
            <YouTube sx={{ color: "#111" }} />
          </IconButton>

          <IconButton
            sx={{
              borderRadius: 2,
              background: "#fff",
              "&:hover": { background: "#e2e2e2" },
            }}
            onClick={() => openUrl(settings?.tiktokurl)}
          >
            <BiLogoTiktok style={{ color: "#111" }} />
          </IconButton>
        </Box>
      </Box>

      {/* COPYRIGHT */}
      <Box
        sx={{
          background: "#CE0E3E",
          display: "flex",
          justifyContent: "center",
          p: 2,
          fontWeight: 400,
          fontSize: "18px",
          lineHeight: "200%",
          color: "#fff",
        }}
      >
        {settings?.copyright}
      </Box>
    </Box>
  );
};

export default FooterLayout;
