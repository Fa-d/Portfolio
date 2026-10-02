import { useState } from "react";
import { Link as RouterLink, NavLink, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import { alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { useTheme } from "../../utils/ThemeContext.tsx";
import { RESUME_PATH } from "../../utils/siteStrings";

const navLinks = [
  { label: "Products", path: "/products" },
  { label: "Projects", path: "/projects" },
  { label: "Open Source", path: "/opensource" },
  { label: "Experience", path: "/experience" },
  { label: "Articles", path: "/articles" },
];

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <Tooltip title={label}>
      <IconButton onClick={toggleTheme} aria-label={label} aria-pressed={isDark} color="inherit">
        {isDark ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
      </IconButton>
    </Tooltip>
  );
}

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      sx={{
        bgcolor: (theme) => alpha(theme.palette.background.paper, 0.85),
        backdropFilter: "saturate(180%) blur(12px)",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* Same gutters and content width as SectionContainer, so the logo lines up with section content. */}
      <Toolbar disableGutters sx={{ maxWidth: { xs: "100%", md: 1200 + 96 }, width: "100%", mx: "auto", px: { xs: 2, sm: 3, md: 6 }, gap: 1 }}>
        <Box
          component={RouterLink}
          to="/"
          aria-label="Home"
          aria-current={pathname === "/" ? "page" : undefined}
          sx={{ display: "flex", alignItems: "center", borderRadius: 2, mr: "auto" }}
        >
          <Box component="img" src="/assets/logo.webp" alt="" width={40} height={40} />
        </Box>

        {/* Desktop navigation */}
        <Box component="nav" aria-label="Main" sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 0.5 }}>
          {navLinks.map((link) => (
            <Button
              key={link.path}
              component={NavLink}
              to={link.path}
              color="inherit"
              sx={{
                px: 1.5,
                fontWeight: 500,
                color: "text.secondary",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  left: 12,
                  right: 12,
                  bottom: 4,
                  height: 2,
                  borderRadius: 1,
                  background: (theme) => theme.palette.custom.gradient,
                  transform: "scaleX(0)",
                  transition: "transform 0.2s ease",
                },
                "&:hover": { color: "text.primary", bgcolor: "transparent" },
                "&:hover::after": { transform: "scaleX(0.5)" },
                "&.active": { color: "text.primary", fontWeight: 600 },
                "&.active::after": { transform: "scaleX(1)" },
              }}
            >
              {link.label}
            </Button>
          ))}
          <Button
            variant="contained"
            href={RESUME_PATH}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<DescriptionOutlinedIcon />}
            sx={{ borderRadius: 5, ml: 1.5, px: 2.5, background: (theme) => theme.palette.custom.gradient }}
          >
            Resume
          </Button>
        </Box>

        <ThemeToggle />

        {/* Mobile navigation */}
        <IconButton
          color="inherit"
          aria-label="Open menu"
          aria-controls="mobile-nav"
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen(true)}
          sx={{ display: { xs: "inline-flex", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Box id="mobile-nav" component="nav" aria-label="Main" sx={{ width: 260, p: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton aria-label="Close menu" onClick={() => setDrawerOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <List>
              {[{ label: "Home", path: "/" }, ...navLinks].map((link) => (
                <ListItem key={link.path} disablePadding>
                  <ListItemButton
                    component={NavLink}
                    to={link.path}
                    end={link.path === "/"}
                    onClick={() => setDrawerOpen(false)}
                    sx={{
                      borderRadius: 2,
                      "&.active": {
                        bgcolor: "action.selected",
                        "& .MuiListItemText-primary": { fontWeight: 700, color: "primary.main" },
                      },
                    }}
                  >
                    <ListItemText primary={link.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Button
              fullWidth
              variant="contained"
              href={RESUME_PATH}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<DescriptionOutlinedIcon />}
              sx={{ mt: 1, borderRadius: 2, background: (theme) => theme.palette.custom.gradient }}
            >
              Resume
            </Button>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
