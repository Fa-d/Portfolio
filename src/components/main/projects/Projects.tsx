import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProjectLanguages from "./ProjectLanguages";
import ProjectLinks from "./ProjectLinks";
import ProjectRibbon, { ProjectType } from "./ProjectRibbon";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";

// Define interfaces locally or move to a shared types file
export interface ProjectLanguageProps {
  logo: string;
  url: string;
}
export interface ProjectLinkProps {
  logo: string;
  url: string;
}

export interface ProjectProps {
  name: string;
  desc: string;
  image: string;
  languages: ProjectLanguageProps[];
  references: ProjectLinkProps[];
  type: ProjectType;
}

const Projects: React.FC = () => {
  const [items, setItems] = useState<ProjectProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);
  const maxItems = 4;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const response = await fetch("/data/projects.json");
        if (!response.ok) {
          throw new Error(
            `Failed to fetch projects data: ${response.statusText}`
          );
        }
        const data: ProjectProps[] = await response.json();
        setItems(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An unknown error occurred while fetching projects"
        );
        setItems([]);
      }
    };
    fetchData();
  }, []);

  // Show all if on /projects route
  useEffect(() => {
    if (location.pathname === "/projects") {
      setShowAll(true);
    } else {
      setShowAll(false);
    }
  }, [location.pathname]);

  if (items.length === 0 && !error) {
    return <Typography>No projects found.</Typography>;
  }

  const displayedItems = showAll ? items : items.slice(0, maxItems);

  return (
    <Box
      sx={{
        color: "text.primary",
        px: { xs: 2, md: 12 },
        pb: { xs: 4, md: 8 },
        pt: 4,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 4 }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, color: "text.primary" }}
        >
          Projects
        </Typography>
        {items.length > maxItems && location.pathname !== "/projects" && (
          <Button
            variant="outlined"
            onClick={() => {
              if (!showAll) {
                navigate("/projects");
              } else {
                navigate("/"); // or your main route
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
            md: "repeat(4, 1fr)",
          },
          gap: 3,
          width: "100%",
        }}
      >
        {displayedItems.map((item, index) => (
          <Paper
            key={item.name || index}
            elevation={2}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              position: "relative",
              transition: "all 0.3s ease",
              "&:hover": {
                elevation: 6,
                transform: "translateY(-4px)",
              },
            }}
          >
            <ProjectRibbon type={item.type || "personal"} />

            <CardMedia
              component="img"
              height="200"
              image={item.image}
              alt={item.name}
              sx={{
                objectFit: "cover",
                backgroundColor: "grey.100",
              }}
            />

            <Box sx={{ p: 3 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 1.5,
                  fontSize: "1.25rem",
                  lineHeight: 1.2,
                }}
              >
                {item.name.trim()}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  mb: 3,
                  color: "text.secondary",
                  lineHeight: 1.6,
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {item.desc}
              </Typography>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <ProjectLanguages items={item.languages} />
                <ProjectLinks items={item.references} />
              </Stack>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default Projects;
