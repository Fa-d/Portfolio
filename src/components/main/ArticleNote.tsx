import React, { useState, useEffect } from "react";
import { openInNewTab } from "../../utils/NewTab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { keyframes } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import LaunchIcon from "@mui/icons-material/Launch";

// Define the interface locally or import from a shared types file later
export interface ArticlesNoteProps {
  title: string;
  date: string;
  url: string;
}

const ArticleNote: React.FC<{ isArticle: boolean }> = ({ isArticle }) => {
  const [items, setItems] = useState<ArticlesNoteProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Only set global loading for 'articles' if isArticle, otherwise for 'notes' skip (not in global state)
      setError(null);
      const dataType = isArticle ? "articles" : "notes";
      try {
        const response = await fetch(`/data/${dataType}.json`);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch ${dataType} data: ${response.statusText}`
          );
        }
        const data: ArticlesNoteProps[] = await response.json();
        setItems(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : `An unknown error occurred while fetching ${dataType}`
        );
        setItems([]); // Clear items on error or set to default
      } finally {
        // if (isArticle)
      }
    };

    fetchData();
  }, [isArticle]);

  if (items.length === 0 && !error) {
    return (
      <Typography>No {isArticle ? "articles" : "notes"} found.</Typography>
    );
  }

  const fadeInUp = keyframes`
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    `;

  const staggerDelay = (index: number) => `${index * 0.1}s`;

  return (
    <Box
      sx={{
        color: "text.primary",
        px: { xs: 2, md: 12 },
        pb: { xs: 4, md: 8 },
        pt: 4,
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "radial-gradient(circle at 70% 30%, rgba(102, 126, 234, 0.05) 0%, transparent 50%)"
              : "radial-gradient(circle at 70% 30%, rgba(102, 126, 234, 0.03) 0%, transparent 50%)",
          zIndex: 1,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 4,
          zIndex: 2,
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "start",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 600, color: "text.primary" }}
          >
            {isArticle ? "ARTICLES" : "NOTES"}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(auto-fit, minmax(400px, 1fr))",
          },
          zIndex: 2,
          position: "relative",
        }}
      >
        {items.map((item, index) => (
          <Paper
            key={item.url || index}
            sx={{
              p: 4,
              borderRadius: 3,
              cursor: isArticle && item.url ? "pointer" : "default",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              animation: `${fadeInUp} 0.6s ease-out ${staggerDelay(
                index
              )} both`,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: (theme) =>
                theme.palette.mode === "dark"
                  ? "0 4px 20px rgba(0, 0, 0, 0.3)"
                  : "0 4px 20px rgba(0, 0, 0, 0.08)",
              "&:hover": {
                transform:
                  isArticle && item.url
                    ? "translateY(-8px)"
                    : "translateY(-2px)",
                boxShadow: (theme) =>
                  theme.palette.mode === "dark"
                    ? "0 12px 40px rgba(0, 0, 0, 0.4)"
                    : "0 12px 40px rgba(0, 0, 0, 0.15)",
                borderColor: "primary.main",
              },
            }}
            onClick={() => {
              if (isArticle && item.url) {
                openInNewTab(item.url);
              }
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 2,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: "text.primary",
                  lineHeight: 1.3,
                  flex: 1,
                  pr: 2,
                }}
              >
                {item.title}
              </Typography>
              {isArticle && item.url && (
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: "primary.main",
                    color: "white",
                    "&:hover": {
                      bgcolor: "primary.dark",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <LaunchIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  fontWeight: 500,
                  px: 2,
                  py: 1,
                  bgcolor: "action.hover",
                  borderRadius: 2,
                  fontSize: "0.875rem",
                }}
              >
                {item.date}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default ArticleNote;
