import { Box, Grid, IconButton, List, ListItem } from "@mui/material";
import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import { BiLogoTiktok } from "react-icons/bi";
import { useEffect, useState } from "react";
import { openUrl } from "../Utils/Utilities";

const FooterLayout = ({settingsData}) => {
  //const [settingsData, setSettingsData] = useState(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); // ✅ DYNAMIC WIDTH

  // ✅ RESPONSIVE WIDTH LISTENER (DESKTOP ONLY)
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // useEffect(() => {
  //   const getFooterData = async () => {
  //     try {
  //       const res = await fetch(
  //         `${process.env.REACT_APP_STRAPI_URL}/api/sitesettings?populate=*`
  //       );
  //       const json = await res.json();
  //       console.log(json);
  //       setSettingsData(json);
  //     } catch (error) {
  //       console.error("Error fetching footer data:", error);
  //     }
  //   };
  //   getFooterData();
  // }, []);

  //const settings = settingsData?.data?.[0];


  const addressLines = settingsData?.address?.split("\n") ?? [];
  return (
    <Box>
      <Box sx={{ background: "#F60945" }}>
        <Box sx={{ 
          p: { xs: 3, sm: 5, md: 8, lg: 10 }, // Responsive padding
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "flex-start",
          maxWidth: "1400px",
          mx: "auto"
        }}>
          {/* LOGO - RESPONSIVE SIZE */}
          {settingsData?.logo?.url ? (
            <img
              src={settingsData.logo.url}
              alt={settingsData.sitename}
              style={{
                width: screenWidth >= 1440 ? "20%" : "25%",
                height: screenWidth >= 1440 ? "20%" : "25%",
                maxWidth: screenWidth >= 1440 ? "180px" : "150px",
                borderRadius: "8px",
                objectFit: "cover",
                padding: "10px",
              }}
            />
          ) : (
            <Box sx={{
              width: screenWidth >= 1440 ? "20%" : "25%",
              height: screenWidth >= 1440 ? "20%" : "25%",
              maxWidth: screenWidth >= 1440 ? "180px" : "150px",
              background: "#fff3",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              fontSize: "18px",
              p: 2,
            }}>
              No Logo
            </Box>
          )}

          {/* ✅ FIXED 3-COLUMN GRID FOR ALL DESKTOPS */}
          <Grid
            container
            sx={{
              fontWeight: 400,
              fontSize: screenWidth >= 1440 ? "28.58px" : "24px",
              lineHeight: "217%",
              color: "#fff",
              flex: 1,
              maxWidth: "70%",
              ml: 2
            }}
            spacing={{ xs: 2, sm: 3, md: 4, lg: 15 }} // Responsive spacing
          >
            {/* COMPANY SECTION */}
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box sx={{ mb: 1, fontSize: screenWidth >= 1440 ? "22px" : "20px" ,textAlign: 'left'}}>
                  Company
                </Box>
                <List sx={{ 
                  fontSize: screenWidth >= 1440 ? "18px" : "16px", 
                  lineHeight: "217%", 
                  p: 0, 
                  m: 0 
                }}>
                  <ListItem sx={{ pl: 0, py: 0.5 }}>About Us</ListItem>
                  <ListItem sx={{ pl: 0, py: 0.5 }}>Our Blog</ListItem>
                  <ListItem sx={{ pl: 0, py: 0.5 }}>Collaboration</ListItem>
                </List>
              </Box>
            </Grid>

            {/* MORE INFO SECTION */}
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box sx={{ mb: 1, fontSize: screenWidth >= 1440 ? "22px" : "20px" ,textAlign: 'left'}}>
                  More Info
                </Box>
                <List sx={{ 
                  fontSize: screenWidth >= 1440 ? "18px" : "16px", 
                  lineHeight: "217%", 
                  p: 0,
                  m: 0
                }}>
                  <ListItem sx={{ pl: 0, py: 0.5 }}>{settingsData?.contactphone}</ListItem>
                  <ListItem sx={{ pl: 0, py: 0.5 }}>Privacy Policy</ListItem>
                  <ListItem sx={{ pl: 0, py: 0.5 }}>Sitemap</ListItem>
                </List>
              </Box>
            </Grid>

            {/* LOCATION SECTION */}
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box sx={{ mb: 1, fontSize: screenWidth >= 1440 ? "22px" : "20px",textAlign: 'left' }}>
                  Location
                </Box>
                <List sx={{ 
                  fontSize: screenWidth >= 1440 ? "18px" : "16px", 
                  lineHeight: "217%", 
                  p: 0,
                  m: 0
                }}>
                  <ListItem sx={{ pl: 0, py: 0.5 }}>{settingsData?.contactemail ?? "—"}</ListItem>
                  <ListItem sx={{ pl: 0, py: 0.5 }}>{addressLines[0] ?? "—"}</ListItem>
                  <ListItem sx={{ pl: 0, py: 0.5 }}>{addressLines[1] ?? ""}</ListItem>
                </List>
                
                {/* SOCIAL ICONS - RESPONSIVE SIZE */}
                <Box sx={{
                  display: "flex",
                  gap: screenWidth >= 1440 ? 1 : 0.8,
                  mt: 3,
                }}>
                  <IconButton sx={{
                    borderRadius: 2,
                    background: "#fff",
                    width: screenWidth >= 1440 ? 48 : 42,
                    height: screenWidth >= 1440 ? 48 : 42,
                    "&:hover": { background: "#e2e2e2" },
                  }} onClick={() => openUrl(settingsData?.facebookurl)}>
                    <Facebook sx={{ color: "#111", fontSize: screenWidth >= 1440 ? 20 : 18 }} />
                  </IconButton>

                  <IconButton sx={{
                    borderRadius: 2,
                    background: "#fff",
                    width: screenWidth >= 1440 ? 48 : 42,
                    height: screenWidth >= 1440 ? 48 : 42,
                    "&:hover": { background: "#e2e2e2" },
                  }} onClick={() => openUrl(settingsData?.instagramurl)}>
                    <Instagram sx={{ color: "#111", fontSize: screenWidth >= 1440 ? 20 : 18 }} />
                  </IconButton>

                  <IconButton sx={{
                    borderRadius: 2,
                    background: "#fff",
                    width: screenWidth >= 1440 ? 48 : 42,
                    height: screenWidth >= 1440 ? 48 : 42,
                    "&:hover": { background: "#e2e2e2" },
                  }} onClick={() => openUrl(settingsData?.twitterurl)}>
                    <Twitter sx={{ color: "#111", fontSize: screenWidth >= 1440 ? 20 : 18 }} />
                  </IconButton>

                  <IconButton sx={{
                    borderRadius: 2,
                    background: "#fff",
                    width: screenWidth >= 1440 ? 48 : 42,
                    height: screenWidth >= 1440 ? 48 : 42,
                    "&:hover": { background: "#e2e2e2" },
                  }} onClick={() => openUrl(settingsData?.youtubeurl)}>
                    <YouTube sx={{ color: "#111", fontSize: screenWidth >= 1440 ? 20 : 18 }} />
                  </IconButton>

                  <IconButton sx={{
                    borderRadius: 2,
                    background: "#fff",
                    width: screenWidth >= 1440 ? 48 : 42,
                    height: screenWidth >= 1440 ? 48 : 42,
                    "&:hover": { background: "#e2e2e2" },
                  }} onClick={() => openUrl(settingsData?.tiktokurl)}>
                    <BiLogoTiktok style={{ color: "#111", fontSize: screenWidth >= 1440 ? 24 : 22 }} />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* COPYRIGHT */}
      <Box sx={{
        background: "#CE0E3E",
        display: "flex",
        justifyContent: "center",
        p: { xs: 2, md: 3 },
        fontWeight: 400,
        fontSize: screenWidth >= 1440 ? "18px" : "16px",
        lineHeight: "200%",
        color: "#fff",
      }}>
        {settingsData?.copyright}
      </Box>
    </Box>
  );
};

export default FooterLayout;
