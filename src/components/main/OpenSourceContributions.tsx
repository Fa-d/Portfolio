import React from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import GitHubIcon from "@mui/icons-material/GitHub";
import CodeIcon from "@mui/icons-material/Code";
import MergeTypeIcon from "@mui/icons-material/MergeType";
import LaunchIcon from "@mui/icons-material/Launch";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SectionContainer from "../common/SectionContainer";
import SectionHeader from "../common/SectionHeader";
import { CardGridSkeleton, EmptyState, ErrorState } from "../common/DataStates";
import { useJsonData } from "../../utils/useJsonData";

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

const typeConfig = {
  PR: { icon: <MergeTypeIcon />, color: "primary.main" },
  Project: { icon: <CodeIcon />, color: "success.dark" },
  Other: { icon: <GitHubIcon />, color: "secondary.main" },
};

const statusColor: Record<string, string> = {
  Merged: "success.dark",
  Completed: "success.dark",
  Open: "info.dark",
  Active: "info.dark",
  Closed: "error.dark",
};

const OpenSourceContributions: React.FC = () => {
  const { data, loading, error, retry } = useJsonData<OpenSourceContribution[]>(
    "/data/opensourcecontributions.json"
  );
  const location = useLocation();
  const contributions = data ?? [];
  const maxItems = 3;
  const showAll = location.pathname === "/opensource";
  const displayedContributions = showAll ? contributions : contributions.slice(0, maxItems);

  return (
    <SectionContainer id="opensource">
      <SectionHeader
        title="Open Source"
        subtitle="Contributions to projects I use and care about."
        seeAllTo={!showAll && contributions.length > maxItems ? "/opensource" : undefined}
      />

      {error ? (
        <ErrorState what="open source contributions" onRetry={retry} />
      ) : loading ? (
        <CardGridSkeleton count={maxItems} minWidth={320} />
      ) : displayedContributions.length === 0 ? (
        <EmptyState message="No open source contributions listed yet." />
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
            gap: 3,
          }}
        >
          {displayedContributions.map((item, index) => {
            const config = typeConfig[item.type] ?? typeConfig.Other;
            return (
              <Paper
                component="article"
                key={`${item.repository}-${index}`}
                variant="outlined"
                sx={{
                  p: 3,
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  overflow: "hidden",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    bgcolor: config.color,
                  },
                  "&:hover, &:focus-within": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                  },
                }}
              >
                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                  <Avatar sx={{ bgcolor: config.color, color: "common.white", width: 44, height: 44 }}>
                    {config.icon}
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="h3" sx={{ fontSize: "1.1rem", lineHeight: 1.35 }}>
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "primary.main", fontWeight: 600, mt: 0.5, wordBreak: "break-word" }}
                    >
                      {item.repository}
                    </Typography>
                  </Box>
                </Stack>

                <Typography variant="body2" sx={{ color: "text.secondary", mb: 2, lineHeight: 1.6 }}>
                  {item.description}
                </Typography>

                {item.technologies?.length > 0 && (
                  <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1, mb: 2 }}>
                    {item.technologies.map((tech) => (
                      <Chip key={tech} label={tech} size="small" variant="outlined" />
                    ))}
                  </Stack>
                )}

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  flexWrap="wrap"
                  gap={1.5}
                  sx={{ mt: "auto", pt: 2, borderTop: "1px solid", borderColor: "divider" }}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <CalendarTodayIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                    <Typography variant="body2" color="text.secondary">
                      {item.date}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip label={item.type} size="small" variant="outlined" />
                    {item.status && (
                      <Chip
                        label={item.status}
                        size="small"
                        sx={{
                          bgcolor: statusColor[item.status] ?? "grey.700",
                          color: "common.white",
                          fontWeight: 600,
                        }}
                      />
                    )}
                    {item.url && (
                      <Button
                        variant="outlined"
                        size="small"
                        endIcon={<LaunchIcon />}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${item.title} on GitHub (opens in a new tab)`}
                      >
                        View
                      </Button>
                    )}
                  </Stack>
                </Stack>
              </Paper>
            );
          })}
        </Box>
      )}
    </SectionContainer>
  );
};

export default OpenSourceContributions;
