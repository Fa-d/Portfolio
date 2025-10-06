import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import { keyframes } from "@mui/system";
import GitHubIcon from "@mui/icons-material/GitHub";
import CodeIcon from "@mui/icons-material/Code";
import MergeTypeIcon from "@mui/icons-material/MergeType";
import LinkIcon from "@mui/icons-material/Link";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Avatar from "@mui/material/Avatar";

export interface OpenSourceContribution {
  type: "PR" | "Project" | "Other";
  title: string;
  repository: string;
  date: string;
  description: string;
  technologies: string[];
  url: string;
  status?: "Merged" | "Open" | "Closed" | "Active" | "Completed";
}

const OpenSourceContributions: React.FC = () => {
  const [contributions, setContributions] = useState<OpenSourceContribution[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);
  const maxItems = 3;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const response = await fetch("/data/opensourcecontributions.json");
        if (!response.ok) {
          throw new Error(
            `Failed to fetch open source contributions data: ${response.statusText}`
          );
        }
        const data: OpenSourceContribution[] = await response.json();
        setContributions(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An unknown error occurred while fetching open source contributions"
        );
        setContributions([]);
      }
    };

    fetchData();
  }, []);

  // Show all if on /opensource route
  useEffect(() => {
    if (location.pathname === "/opensource") {
      setShowAll(true);
    } else {
      setShowAll(false);
    }
  }, [location.pathname]);

  if (contributions.length === 0 && !error) {
    return <Typography>No open source contributions found.</Typography>;
  }

  const displayedContributions = showAll
    ? contributions
    : contributions.slice(0, maxItems);

  const fadeIn = keyframes`
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  `;

  const slideInDown = keyframes`
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  `;

  const staggerDelay = (index: number) => `${index * 0.15}s`;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "PR":
        return <MergeTypeIcon sx={{ fontSize: 24 }} />;
      case "Project":
        return <CodeIcon sx={{ fontSize: 24 }} />;
      default:
        return <GitHubIcon sx={{ fontSize: 24 }} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "PR":
        return "#2196f3";
      case "Project":
        return "#4caf50";
      default:
        return "#9c27b0";
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "Merged":
        return "success.main";
      case "Open":
        return "info.main";
      case "Active":
        return "info.main";
      case "Completed":
        return "success.main";
      case "Closed":
        return "error.main";
      default:
        return "text.secondary";
    }
  };

  return (
    <Box
      sx={{
        color: "text.primary",
        px: { xs: 2, md: 12 },
        py: { xs: 4, md: 8 },
        position: "relative",
        bgcolor: "background.default",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 5, maxWidth: "1400px", mx: "auto" }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            color: "text.primary",
            animation: `${slideInDown} 0.6s ease-out`,
          }}
        >
          Open Source Contributions
        </Typography>
        {contributions.length > maxItems &&
          location.pathname !== "/opensource" && (
            <Button
              variant="outlined"
              onClick={() => {
                if (!showAll) {
                  navigate("/opensource");
                } else {
                  navigate("/");
                }
              }}
              sx={{
                textTransform: "none",
                borderRadius: 2,
                px: 3,
                fontSize: "0.9rem",
                fontWeight: 500,
              }}
            >
              {showAll ? "Show Less" : "See All"}
            </Button>
          )}
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: 3,
          maxWidth: "1400px",
          mx: "auto",
        }}
      >
        {displayedContributions.map((item, index) => (
          <Paper
            key={`${item.repository}-${index}`}
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: (theme) =>
                theme.palette.mode === "dark"
                  ? "0 4px 20px rgba(0, 0, 0, 0.3)"
                  : "0 4px 20px rgba(0, 0, 0, 0.08)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              animation: `${fadeIn} 0.6s ease-out ${staggerDelay(index)} both`,
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: getTypeColor(item.type),
              },
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: (theme) =>
                  theme.palette.mode === "dark"
                    ? "0 12px 40px rgba(0, 0, 0, 0.4)"
                    : "0 12px 40px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <Avatar
                sx={{
                  bgcolor: getTypeColor(item.type),
                  width: 48,
                  height: 48,
                }}
              >
                {getTypeIcon(item.type)}
              </Avatar>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  spacing={1}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "text.primary",
                      lineHeight: 1.3,
                      fontSize: "1.1rem",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Chip
                    label={item.type}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      bgcolor: getTypeColor(item.type),
                      color: "white",
                      fontSize: "0.7rem",
                    }}
                  />
                </Stack>
                <Typography
                  variant="body2"
                  sx={{
                    color: "primary.main",
                    fontWeight: 600,
                    mt: 0.5,
                  }}
                >
                  {item.repository}
                </Typography>
              </Box>
            </Stack>
            <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    mb: 2,
                    lineHeight: 1.6,
                  }}
                >
                  {item.description}
                </Typography>

                {item.technologies && item.technologies.length > 0 && (
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ flexWrap: "wrap", gap: 1, mb: 2 }}
                  >
                    {item.technologies.map((tech, techIndex) => (
                      <Chip
                        key={techIndex}
                        label={tech}
                        size="small"
                        variant="outlined"
                        sx={{
                          borderColor: "primary.main",
                          color: "text.primary",
                        }}
                      />
                    ))}
                  </Stack>
                )}

                <Box
                  sx={{
                    height: "1px",
                    bgcolor: "divider",
                    mx: -3,
                    my: 2,
                    borderRadius: "1px",
                  }}
                />

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  flexWrap="wrap"
                  gap={2}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CalendarTodayIcon
                      sx={{ fontSize: 18, color: "text.secondary" }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontWeight: 500,
                        bgcolor: "action.hover",
                        px: 2,
                        py: 0.5,
                        borderRadius: 2,
                      }}
                    >
                      {item.date}
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={1} alignItems="center">
                    {item.status && (
                      <Chip
                        label={item.status}
                        size="small"
                        sx={{
                          bgcolor: getStatusColor(item.status),
                          color: "white",
                          fontWeight: 600,
                        }}
                      />
                    )}
                    {item.url && (
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<LinkIcon />}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          textTransform: "none",
                          borderRadius: 2,
                        }}
                      >
                        View
                      </Button>
                    )}
                  </Stack>
                </Stack>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default OpenSourceContributions;
