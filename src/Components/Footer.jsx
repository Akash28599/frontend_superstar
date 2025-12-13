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
        <Box sx={{ p: 10, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
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
              fontWeight: 400,
              fontSize: "28.58px",
              lineHeight: "217%",
              color: "#fff",
              flex: 1,
              maxWidth: "70%",
            }}
            spacing={15}
          >
            {/* COMPANY SECTION */}
            <Grid item xs={4}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                height: '100%'
              }}>
                <Box sx={{ 
                  mb: 1 // Consistent margin for all headings
                }}>
                  Company
                </Box>
                <List sx={{ 
                  fontSize: "18px", 
                  lineHeight: "217%", 
                  p: 0, // Remove padding
                  m: 0 // Remove margin
                }}>
                  <ListItem sx={{ pl: 0, py: 0.5 }}>About Us</ListItem>
                  <ListItem sx={{ pl: 0, py: 0.5 }}>Our Blog</ListItem>
                  <ListItem sx={{ pl: 0, py: 0.5 }}>Collaboration</ListItem>
                </List>
              </Box>
            </Grid>

            {/* MORE INFO SECTION */}
            <Grid item xs={4}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                height: '100%'
              }}>
                <Box sx={{ 
                  mb: 1 // Same margin as Company
                }}>
                  More Info
                </Box>
                <List sx={{ 
                  fontSize: "18px", 
                  lineHeight: "217%", 
                  p: 0,
                  m: 0
                }}>
                  <ListItem sx={{ pl: 0, py: 0.5 }}>Contact:+234 801 234</ListItem>
                  <ListItem sx={{ pl: 0, py: 0.5 }}>Privacy Policy</ListItem>
                  <ListItem sx={{ pl: 0, py: 0.5 }}>Sitemap</ListItem>
                </List>
              </Box>
            </Grid>

            {/* LOCATION SECTION */}
            <Grid item xs={4}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                height: '100%'
              }}>
                <Box sx={{ 
                  mb: 1 // Same margin as others
                }}>
                  Location
                </Box>
                <List sx={{ 
                  fontSize: "18px", 
                  lineHeight: "217%", 
                  p: 0,
                  m: 0
                }}>
                  <ListItem sx={{ pl: 0, py: 0.5 }}>{settings?.contactemail ?? "—"}</ListItem>
                  <ListItem sx={{ pl: 0, py: 0.5 }}>{addressLines[0] ?? "—"}</ListItem>
                  <ListItem sx={{ pl: 0, py: 0.5 }}>{addressLines[1] ?? ""}</ListItem>
                </List>
                
                {/* SOCIAL ICONS */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    mt: 3, // Consistent margin from list items
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
            </Grid>
          </Grid>
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