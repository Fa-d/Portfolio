import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Skeleton from "@mui/material/Skeleton";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import LaunchIcon from "@mui/icons-material/Launch";
import SectionContainer from "../common/SectionContainer";
import SectionHeader from "../common/SectionHeader";
import { EmptyState, ErrorState } from "../common/DataStates";
import { useJsonData } from "../../utils/useJsonData";

interface Project {
  name: string;
  description: string;
  url?: string;
}

interface Position {
  role: string;
  date: string;
  // Some entries store the description as an array of paragraphs.
  description: string | string[];
  skills: string[];
  projects: Project[];
}

interface CompanyExperience {
  company: string;
  totalDuration: string;
  location: string;
  positions: Position[];
}

const isCurrent = (date: string) => /present/i.test(date);

// Split descriptions into lines; lines written as "· item" become bullet points.
const descriptionLines = (description: Position["description"]): string[] =>
  (Array.isArray(description) ? description.join("\n") : description ?? "")
    .split("\n")
    .map((line) => line.replace(/^\s*[·•-]\s*/, "").trim())
    .filter(Boolean);

const PositionDetails: React.FC<{ position: Position }> = ({ position }) => {
  const lines = descriptionLines(position.description);

  return (
    <Box sx={{ pl: 2, borderLeft: "2px solid", borderColor: "divider" }}>
      <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 0.5 }}>
        <Typography variant="h4" sx={{ fontSize: "1.05rem", fontWeight: 600 }}>
          {position.role}
        </Typography>
        {isCurrent(position.date) && (
          <Chip label="Current" size="small" color="primary" sx={{ height: 22, fontWeight: 600 }} />
        )}
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
        {position.date}
      </Typography>

      {lines.length > 1 ? (
        <Box component="ul" sx={{ pl: 2.5, mb: 2, color: "text.secondary" }}>
          {lines.map((line, idx) => (
            <Typography component="li" variant="body2" key={idx} sx={{ mb: 0.5, lineHeight: 1.6 }}>
              {line}
            </Typography>
          ))}
        </Box>
      ) : lines.length === 1 ? (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
          {lines[0]}
        </Typography>
      ) : null}

      {position.skills.length > 0 && (
        <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1, mb: 2 }}>
          {position.skills.map((skill) => (
            <Chip key={skill} label={skill} size="small" />
          ))}
        </Stack>
      )}

      {position.projects.length > 0 && (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: "text.secondary" }}>
            Projects
          </Typography>
          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
            {position.projects.map((project) =>
              project.url ? (
                <Chip
                  key={project.name}
                  component="a"
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  clickable
                  icon={<LaunchIcon />}
                  label={project.name}
                  size="small"
                  variant="outlined"
                  color="primary"
                  title={project.description}
                />
              ) : (
                <Chip
                  key={project.name}
                  icon={<FolderOutlinedIcon />}
                  label={project.name}
                  size="small"
                  variant="outlined"
                  title={project.description}
                />
              )
            )}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

const CompanyCard: React.FC<{ company: CompanyExperience }> = ({ company }) => {
  const [expanded, setExpanded] = useState(false);
  const [latest, ...earlier] = company.positions;

  return (
    <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, flexGrow: 1, minWidth: 0 }}>
      <Typography variant="h3" sx={{ fontSize: { xs: "1.15rem", md: "1.3rem" }, mb: 1 }}>
        {company.company}
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 0.5, sm: 3 }}
        sx={{ mb: 2.5, color: "text.secondary" }}
      >
        <Stack direction="row" alignItems="center" spacing={0.75}>
          <CalendarTodayIcon sx={{ fontSize: 16 }} />
          <Typography variant="body2">{company.totalDuration}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={0.75}>
          <LocationOnOutlinedIcon sx={{ fontSize: 18 }} />
          <Typography variant="body2">{company.location}</Typography>
        </Stack>
      </Stack>

      {latest && <PositionDetails position={latest} />}

      {earlier.length > 0 && (
        <>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Stack spacing={3} sx={{ mt: 3 }}>
              {earlier.map((position) => (
                <PositionDetails key={`${position.role}-${position.date}`} position={position} />
              ))}
            </Stack>
          </Collapse>
          <Button
            size="small"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            endIcon={
              <ExpandMoreIcon
                sx={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
              />
            }
            sx={{ mt: 2 }}
          >
            {expanded
              ? "Hide earlier roles"
              : `Show ${earlier.length} earlier ${earlier.length === 1 ? "role" : "roles"}`}
          </Button>
        </>
      )}
    </Paper>
  );
};

const CareerSkeleton: React.FC = () => (
  <Stack spacing={3} aria-busy="true" aria-label="Loading">
    {Array.from({ length: 3 }).map((_, index) => (
      <Paper key={index} variant="outlined" sx={{ p: 3, borderRadius: 3, ml: { xs: 5, md: 7 } }}>
        <Skeleton variant="text" sx={{ fontSize: "1.4rem", width: "40%" }} />
        <Skeleton variant="text" width="30%" sx={{ mb: 2 }} />
        <Skeleton variant="text" width="50%" />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="85%" />
      </Paper>
    ))}
  </Stack>
);

const Career: React.FC = () => {
  const { data, loading, error, retry } = useJsonData<CompanyExperience[]>("/data/career.json");
  const companies = data ?? [];

  return (
    <SectionContainer id="experience">
      <SectionHeader title="Experience" />

      {error ? (
        <ErrorState what="experience" onRetry={retry} />
      ) : loading ? (
        <CareerSkeleton />
      ) : companies.length === 0 ? (
        <EmptyState message="No experience listed yet." />
      ) : (
        <Box component="ol" sx={{ listStyle: "none", position: "relative" }}>
          {companies.map((company, index) => (
            <Box
              component="li"
              key={`${company.company}-${index}`}
              sx={{ display: "flex", gap: { xs: 1.5, md: 3 }, pb: index < companies.length - 1 ? { xs: 3, md: 4 } : 0 }}
            >
              {/* Timeline rail: dot aligned with the company name, line runs to the next item */}
              <Box
                aria-hidden
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flexShrink: 0,
                  pt: { xs: 2, md: 3 },
                }}
              >
                <Box
                  sx={{
                    width: { xs: 32, md: 40 },
                    height: { xs: 32, md: 40 },
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "common.white",
                    background: (theme) => theme.palette.custom.gradient,
                    boxShadow: (theme) => `0 0 0 4px ${theme.palette.background.default}`,
                  }}
                >
                  <WorkOutlineIcon sx={{ fontSize: { xs: 16, md: 20 } }} />
                </Box>
                {index < companies.length - 1 && (
                  <Box
                    sx={{
                      flexGrow: 1,
                      width: 2,
                      mt: 1,
                      mb: { xs: -3, md: -4 },
                      background: (theme) =>
                        `linear-gradient(180deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      opacity: 0.5,
                    }}
                  />
                )}
              </Box>
              <CompanyCard company={company} />
            </Box>
          ))}
        </Box>
      )}
    </SectionContainer>
  );
};

export default Career;
