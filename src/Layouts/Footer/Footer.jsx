import { Box, Grid, List, ListItem } from "@mui/material";
import { useEffect, useState } from "react";
import SocialIcons from "../../Components/SocialIcons/SocialIcons";

const Footer = ({settingsData}) => {
  //const [settingsData, setSettingsData] = useState(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); // ✅ DYNAMIC WIDTH

  // ✅ RESPONSIVE WIDTH LISTENER (DESKTOP ONLY)
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const addressLines = settingsData?.address?.split("\n") ?? [];
  return (
    <Box>
      <Box sx={{ background: "#dd2120" }}>
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
                maxWidth: screenWidth >= 1440 ? "220px" : "200px",
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
                  <SocialIcons siteSettings={settingsData}/>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* COPYRIGHT */}
      <Box sx={{
        background: "#c11b1bff",
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

export default Footer;
