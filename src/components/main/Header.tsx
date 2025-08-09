import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import { useTheme } from "../../utils/ThemeContext.tsx";
import { useNavigate } from "react-router-dom";
import Logo from "/assets/logo.png";
import { useState } from "react";

// Direct paths to assets in public folder
const lightImgPath = "/assets/light.png";
const darkImgPath = "/assets/dark.png";
const resumePath = "/assets/MD_SADAKAT_HUSSAIN_FAHAD.pdf";

const navLinks = [
  { label: "Projects", path: "/projects" },
  { label: "Experience", path: "/experience" },
  { label: "Articles", path: "/articles" },
  { label: "Home", path: "/" },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => setDrawerOpen((open) => !open);
  const handleNavClick = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <AppBar position="sticky" color="default" elevation={2}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <img src={Logo} alt="Logo" style={{ height: 40, marginRight: 16 }} />
          <Typography variant="h6" color="inherit" noWrap></Typography>
        </Box>
        {isMobile ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton onClick={toggleTheme} color="inherit" sx={{ ml: 1 }}>
              <img
                src={theme === "dark" ? darkImgPath : lightImgPath}
                alt="Toggle theme"
                style={{ height: 30, width: 30 }}
              />
            </IconButton>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleDrawerToggle}
              sx={{ ml: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={handleDrawerToggle}
            >
              <Box
                sx={{ width: 220 }}
                role="presentation"
                onClick={handleDrawerToggle}
              >
                <List>
                  {navLinks.map((link) => (
                    <ListItem key={link.label} disablePadding>
                      <ListItemButton onClick={() => handleNavClick(link.path)}>
                        <ListItemText primary={link.label} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                  <ListItem disablePadding>
                    <ListItemButton
                      component="a"
                      href={resumePath}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ListItemText primary="Resume" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
            </Drawer>
          </Box>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {navLinks.map((link) => (
              <Button
                key={link.label}
                color="inherit"
                onClick={() => navigate(link.path)}
              >
                {link.label}
              </Button>
            ))}
            <Button
              variant="contained"
              color="inherit"
              href={resumePath}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                borderRadius: 5,
                ml: 2,
                backgroundColor: muiTheme.palette.custom.button,
                color: "#fff",
                "&:hover": { backgroundColor: muiTheme.palette.custom.button },
              }}
              endIcon={<span style={{ marginLeft: 4 }}>&rarr;</span>}
            >
              Resume
            </Button>
            <IconButton onClick={toggleTheme} color="inherit" sx={{ ml: 2 }}>
              <img
                src={theme === "dark" ? darkImgPath : lightImgPath}
                alt="Toggle theme"
                style={{ height: 30, width: 30 }}
              />
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
