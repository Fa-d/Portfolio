import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ProjectLanguages from "./ProjectLanguages";
import ProjectLinks from "./ProjectLinks";
import ProjectRibbon, { ProjectType } from "./ProjectRibbon";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import SectionContainer from "../../common/SectionContainer";
import SectionHeader from "../../common/SectionHeader";
import { CardGridSkeleton, EmptyState, ErrorState } from "../../common/DataStates";
import { useJsonData } from "../../../utils/useJsonData";

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

const MEDIA_HEIGHT = 220;

// Portrait phone screenshots are shown whole inside a phone-like frame;
// landscape screenshots fill the media area.
const ProjectImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [portrait, setPortrait] = useState<boolean | null>(null);

  return (
    <Box
      sx={{
        height: MEDIA_HEIGHT,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: (theme) => theme.palette.custom.gradientSoft,
        overflow: "hidden",
        pt: portrait ? 2 : 0,
      }}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={(e: React.SyntheticEvent<HTMLImageElement>) => {
          const img = e.currentTarget;
          setPortrait(img.naturalHeight > img.naturalWidth);
        }}
        sx={
          portrait
            ? {
                height: "100%",
                width: "auto",
                objectFit: "cover",
                objectPosition: "top",
                borderRadius: "14px 14px 0 0",
                border: "4px solid",
                borderBottom: 0,
                borderColor: "grey.900",
                boxShadow: 4,
              }
            : {
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top",
              }
        }
      />
    </Box>
  );
};

const Projects: React.FC = () => {
  const { data, loading, error, retry } = useJsonData<ProjectProps[]>("/data/projects.json");
  const location = useLocation();
  const items = data ?? [];
  const maxItems = 4;
  const showAll = location.pathname === "/projects";
  const displayedItems = showAll ? items : items.slice(0, maxItems);

  return (
    <SectionContainer id="projects">
      <SectionHeader
        title="Projects"
        seeAllTo={!showAll && items.length > maxItems ? "/projects" : undefined}
      />

      {error ? (
        <ErrorState what="projects" onRetry={retry} />
      ) : loading ? (
        <CardGridSkeleton count={showAll ? 6 : maxItems} minWidth={260} mediaHeight={MEDIA_HEIGHT} />
      ) : displayedItems.length === 0 ? (
        <EmptyState message="No projects listed yet." />
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
            gap: 3,
          }}
        >
          {displayedItems.map((item, index) => {
            const name = item.name.trim();
            return (
              <Paper
                component="article"
                key={`${name}-${index}`}
                variant="outlined"
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover, &:focus-within": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                  },
                }}
              >
                <ProjectRibbon type={item.type || "personal"} />
                <ProjectImage src={item.image} alt={`${name} screenshot`} />

                <Box sx={{ p: 2.5, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <Typography variant="h3" sx={{ fontSize: "1.2rem", mb: 1, lineHeight: 1.3 }}>
                    {name}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      mb: 2,
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
                    sx={{ mt: "auto" }}
                  >
                    <ProjectLanguages items={item.languages} />
                    <ProjectLinks items={item.references} projectName={name} />
                  </Stack>
                </Box>
              </Paper>
            );
          })}
        </Box>
      )}
    </SectionContainer>
  );
};

export default Projects;
