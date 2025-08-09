import { useState, useEffect } from "react";
import Lottie from "react-lottie-player";
import { ContactItems } from "./ContactItems";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { keyframes } from "@mui/system";

// Define an interface for the strings data
interface SiteStrings {
  FullName?: string;
  Position?: string;
  Subtitle?: string;
  AboutMeDescription?: string;
  AboutMeDescription2?: string;
  ExportTitle?: string;
}

export default function About() {
  const [strings, setStrings] = useState<SiteStrings>({});
  const [animationData, setAnimationData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        // Fetch strings data
        const stringsResponse = await fetch("/data/strings.json");
        if (!stringsResponse.ok) {
          throw new Error(
            `Failed to fetch strings: ${stringsResponse.statusText}`
          );
        }
        const stringsData: SiteStrings = await stringsResponse.json();
        setStrings(stringsData);

        // Fetch Lottie animation data
        const animationResponse = await fetch("/assets/person.json");
        if (!animationResponse.ok) {
          throw new Error(
            `Failed to fetch animation data: ${animationResponse.statusText}`
          );
        }
        const animationJson = await animationResponse.json();
        setAnimationData(animationJson);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  const slideInLeft = keyframes`
        from { opacity: 0; transform: translateX(-50px); }
        to { opacity: 1; transform: translateX(0); }
    `;

  const slideInRight = keyframes`
        from { opacity: 0; transform: translateX(50px); }
        to { opacity: 1; transform: translateX(0); }
    `;

  const fadeInUp = keyframes`
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    `;

  return (
    <Box
      sx={{
        position: "relative",
        px: 0,
        py: { xs: 4, md: 8 },
        minHeight: "70vh",
        bgcolor: "background.default",
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        background: (theme) =>
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, rgba(25, 25, 25, 0.95) 0%, rgba(35, 39, 43, 1) 100%)"
            : "linear-gradient(135deg, rgba(238, 242, 248, 0.95) 0%, rgba(241, 245, 249, 1) 100%)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 107, 107, 0.1) 0%, transparent 50%)"
              : "radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 107, 107, 0.05) 0%, transparent 50%)",
          zIndex: 1,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          gap: 4,
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
          position: "relative",
          maxWidth: "xl",
          margin: "0 auto",
          px: { xs: 2, md: 12 },
        }}
      >
        <Box
          sx={{
            flex: 1,
            animation: `${slideInLeft} 1s ease-out`,
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              pr: { md: 6 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              py: { xs: 4, md: 6 },
              px: { xs: 2, md: 0 },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                whiteSpace: "pre-line",
                mb: 2,
                color: "text.secondary",
                animation: `${fadeInUp} 1.2s ease-out`,
              }}
            >
              {strings.AboutMeDescription || ""}
            </Typography>

            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 1,
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "linear-gradient(45deg, #667eea 30%, #764ba2 90%)"
                    : "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: `${fadeInUp} 1.4s ease-out`,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                lineHeight: 1.1,
              }}
            >
              {strings.FullName || "Your Name"}
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: "text.primary",
                animation: `${fadeInUp} 1.6s ease-out`,
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            >
              {strings.Position || "Your Position"}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                mb: 4,
                fontStyle: "italic",
                animation: `${fadeInUp} 1.8s ease-out`,
              }}
            >
              {strings.Subtitle || "Your Subtitle"}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                whiteSpace: "pre-line",
                mb: 2,
                color: "text.secondary",
                animation: `${fadeInUp} 2s ease-out`,
              }}
            >
              {strings.AboutMeDescription2 || ""}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                color: "text.primary",
                width: "fit-content",
                mt: 6,
                animation: `${fadeInUp} 2.2s ease-out`,
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "3px",
                  height: "100%",
                  background: (theme) =>
                    theme.palette.mode === "dark"
                      ? "linear-gradient(45deg, rgba(120, 119, 198, 0.8) 30%, rgba(255, 107, 107, 0.8) 90%)"
                      : "linear-gradient(45deg, rgba(102, 126, 234, 0.8) 30%, rgba(255, 107, 107, 0.8) 90%)",
                  borderRadius: "2px",
                },
                pl: 3,
              }}
            >
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: 600, 
                  mb: 2,
                  color: "text.primary",
                  fontSize: "1.1rem"
                }}
              >
                {strings.ExportTitle || "Connect"}
              </Typography>
              <ContactItems />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            animation: `${slideInRight} 1s ease-out`,
            zIndex: 2,
            position: "relative",
            py: { xs: 4, md: 6 },
          }}
        >
          {animationData && (
            <Box
              sx={{
                position: "relative",
                maxWidth: { xs: 300, sm: 350, md: 400 },
                width: "100%",
                aspectRatio: "1 / 1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "120%",
                  height: "120%",
                  background: (theme) =>
                    theme.palette.mode === "dark"
                      ? "radial-gradient(circle, rgba(120, 119, 198, 0.1) 0%, transparent 70%)"
                      : "radial-gradient(circle, rgba(102, 126, 234, 0.08) 0%, transparent 70%)",
                  borderRadius: "50%",
                  zIndex: -1,
                  animation: "breathe 4s ease-in-out infinite",
                  "@keyframes breathe": {
                    "0%, 100%": { transform: "translate(-50%, -50%) scale(1)" },
                    "50%": { transform: "translate(-50%, -50%) scale(1.1)" },
                  },
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "80%",
                  height: "80%",
                  background: (theme) =>
                    theme.palette.mode === "dark"
                      ? "radial-gradient(circle, rgba(255, 107, 107, 0.08) 0%, transparent 60%)"
                      : "radial-gradient(circle, rgba(255, 107, 107, 0.06) 0%, transparent 60%)",
                  borderRadius: "50%",
                  zIndex: -1,
                  animation: "breathe 4s ease-in-out infinite 2s",
                  "@keyframes breathe": {
                    "0%, 100%": { transform: "translate(-50%, -50%) scale(1)" },
                    "50%": { transform: "translate(-50%, -50%) scale(1.2)" },
                  },
                },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  zIndex: 2,
                  width: "100%",
                  height: "100%",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Lottie
                  loop={true}
                  style={{
                    width: "100%",
                    height: "100%",
                    filter: "drop-shadow(0 8px 32px rgba(0, 0, 0, 0.15))",
                  }}
                  animationData={animationData}
                  play
                />
              </Box>

              {/* Floating decorative elements */}
              <Box
                sx={{
                  position: "absolute",
                  top: "15%",
                  right: "10%",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(120, 119, 198, 0.7)"
                      : "rgba(102, 126, 234, 0.7)",
                  animation: "float 3s ease-in-out infinite",
                  "@keyframes float": {
                    "0%, 100%": { transform: "translateY(0px) scale(1)" },
                    "50%": { transform: "translateY(-10px) scale(1.2)" },
                  },
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  bottom: "20%",
                  left: "15%",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(255, 107, 107, 0.7)"
                      : "rgba(255, 107, 107, 0.7)",
                  animation: "float 3s ease-in-out infinite 1.5s",
                  "@keyframes float": {
                    "0%, 100%": { transform: "translateY(0px) scale(1)" },
                    "50%": { transform: "translateY(-8px) scale(1.1)" },
                  },
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  top: "60%",
                  left: "8%",
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(120, 119, 198, 0.5)"
                      : "rgba(102, 126, 234, 0.5)",
                  animation: "float 4s ease-in-out infinite 0.8s",
                  "@keyframes float": {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-6px)" },
                  },
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
