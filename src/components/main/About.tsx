import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { keyframes } from "@mui/system";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { ContactItems } from "./ContactItems";
import HeroAvatar from "./HeroAvatar";
import { DEFAULT_NAME, RESUME_PATH, useSiteStrings } from "../../utils/siteStrings";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

const enter = (delay: number) => `${fadeInUp} 0.6s ease-out ${delay}s both`;

export default function About() {
  // On error the hero still renders with built-in defaults instead of disappearing.
  const { data, loading } = useSiteStrings();
  const strings = data ?? {};
  const name = strings.FullName || DEFAULT_NAME;

  return (
    <Box
      component="section"
      id="about"
      aria-labelledby="hero-name"
      sx={{
        position: "relative",
        overflow: "hidden",
        px: { xs: 2, sm: 3, md: 6 },
        pt: { xs: 5, md: 10 },
        pb: { xs: 6, md: 10 },
        background: (theme) =>
          theme.palette.mode === "dark"
            ? "radial-gradient(circle at 15% 85%, rgba(102,126,234,0.12) 0%, transparent 45%), radial-gradient(circle at 85% 15%, rgba(118,75,162,0.14) 0%, transparent 45%)"
            : "radial-gradient(circle at 15% 85%, rgba(102,126,234,0.10) 0%, transparent 45%), radial-gradient(circle at 85% 15%, rgba(118,75,162,0.08) 0%, transparent 45%)",
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          alignItems: "center",
          gap: { xs: 4, md: 8 },
        }}
      >
        <Box sx={{ flex: 1.2, minWidth: 0, width: "100%" }}>
          {loading ? (
            <Box aria-busy="true" aria-label="Loading">
              <Skeleton variant="text" width={160} sx={{ fontSize: "1.2rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "3.5rem", width: "90%" }} />
              <Skeleton variant="text" sx={{ fontSize: "1.8rem", width: "50%", mb: 2 }} />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton variant="text" width="70%" />
            </Box>
          ) : (
            <>
              {strings.AboutMeDescription && (
                <Typography
                  variant="h6"
                  component="p"
                  sx={{ color: "text.secondary", fontWeight: 500, mb: 1, animation: enter(0) }}
                >
                  {strings.AboutMeDescription}
                </Typography>
              )}

              <Typography
                id="hero-name"
                variant="h1"
                sx={{
                  fontSize: { xs: "2.25rem", sm: "2.75rem", md: "3.5rem" },
                  lineHeight: 1.1,
                  mb: 1.5,
                  background: (theme) => theme.palette.custom.gradient,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: enter(0.08),
                }}
              >
                {name}
              </Typography>

              {strings.Position && (
                <Typography
                  variant="h5"
                  component="p"
                  sx={{
                    fontWeight: 600,
                    color: "text.primary",
                    fontSize: { xs: "1.3rem", md: "1.6rem" },
                    animation: enter(0.16),
                  }}
                >
                  {strings.Position}
                </Typography>
              )}

              {strings.Subtitle && (
                <Typography
                  variant="body1"
                  sx={{ color: "primary.main", fontWeight: 600, mt: 0.5, mb: 3, animation: enter(0.2) }}
                >
                  {strings.Subtitle}
                </Typography>
              )}

              {strings.AboutMeDescription2 && (
                <Typography
                  variant="body1"
                  sx={{
                    whiteSpace: "pre-line",
                    color: "text.secondary",
                    fontSize: { xs: "1rem", md: "1.075rem" },
                    lineHeight: 1.75,
                    maxWidth: 580,
                    animation: enter(0.24),
                  }}
                >
                  {strings.AboutMeDescription2}
                </Typography>
              )}
            </>
          )}

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={{ mt: 4, animation: enter(0.3) }}
          >
            <Button
              component={RouterLink}
              to="/projects"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{ borderRadius: 2.5, px: 3, background: (theme) => theme.palette.custom.gradient }}
            >
              View my work
            </Button>
            <Button
              href={RESUME_PATH}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              size="large"
              startIcon={<DescriptionOutlinedIcon />}
              sx={{ borderRadius: 2.5, px: 3 }}
            >
              Resume
            </Button>
          </Stack>

          <Box sx={{ mt: 4, animation: enter(0.36) }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: "text.secondary", mb: 1 }}>
              {strings.ExportTitle || "Connect with me"}
            </Typography>
            <ContactItems />
          </Box>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            width: "100%",
            animation: enter(0.1),
          }}
        >
          <HeroAvatar name={name} />
        </Box>
      </Box>
    </Box>
  );
}
