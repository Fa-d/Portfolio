import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import SchoolIcon from "@mui/icons-material/School";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import SectionContainer from "../common/SectionContainer";
import SectionHeader from "../common/SectionHeader";
import { EmptyState, ErrorState } from "../common/DataStates";
import { useJsonData } from "../../utils/useJsonData";

export interface EducationProps {
  institution: string;
  date: string;
  degree: string;
  grade: string;
}

const Education: React.FC = () => {
  const { data, loading, error, retry } = useJsonData<EducationProps[]>("/data/education.json");
  const steps = data ?? [];
  const theme = useTheme();
  // Alternate left/right on wide screens; single column with full-width cards on small ones.
  const alternate = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <SectionContainer id="education">
      <SectionHeader title="Education" />

      {error ? (
        <ErrorState what="education" onRetry={retry} />
      ) : loading ? (
        <Box aria-busy="true" aria-label="Loading">
          {Array.from({ length: 2 }).map((_, index) => (
            <Skeleton key={index} variant="rounded" height={150} sx={{ mb: 3, borderRadius: 3 }} />
          ))}
        </Box>
      ) : steps.length === 0 ? (
        <EmptyState message="No education listed yet." />
      ) : (
        <Timeline
          position={alternate ? "alternate" : "right"}
          sx={{
            p: 0,
            m: 0,
            ...(!alternate && {
              [`& .${timelineItemClasses.root}:before`]: { flex: 0, padding: 0 },
            }),
          }}
        >
          {steps.map((item, index) => (
            <TimelineItem key={item.institution}>
              <TimelineSeparator>
                <TimelineDot
                  sx={{
                    width: { xs: 36, md: 48 },
                    height: { xs: 36, md: 48 },
                    m: 0,
                    mt: 1,
                    p: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: 0,
                    background: (t) => t.palette.custom.gradient,
                    boxShadow: (t) => `0 0 0 4px ${t.palette.background.default}`,
                  }}
                >
                  <SchoolIcon sx={{ color: "common.white", fontSize: { xs: 18, md: 24 } }} />
                </TimelineDot>
                {index < steps.length - 1 && (
                  <TimelineConnector
                    sx={{
                      width: 2,
                      minHeight: 40,
                      opacity: 0.5,
                      background: (t) =>
                        `linear-gradient(180deg, ${t.palette.primary.main}, ${t.palette.secondary.main})`,
                    }}
                  />
                )}
              </TimelineSeparator>
              <TimelineContent sx={{ pt: 0, pb: 3, px: { xs: 1.5, md: 2 } }}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: { xs: 2, md: 3 },
                    borderRadius: 3,
                    textAlign: "left",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: (t) => t.palette.custom.gradient,
                    },
                  }}
                >
                  <Typography variant="h3" sx={{ fontSize: { xs: "1.1rem", md: "1.25rem" }, lineHeight: 1.3, mb: 0.5 }}>
                    {item.degree}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: "primary.main", mb: 2 }}>
                    {item.institution}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 1.5,
                      pt: 2,
                      borderTop: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.secondary" }}>
                      <CalendarTodayIcon sx={{ fontSize: 16 }} />
                      <Typography variant="body2">{item.date}</Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: "secondary.contrastText",
                        bgcolor: "secondary.main",
                        px: 1.5,
                        py: 0.25,
                        borderRadius: 2,
                      }}
                    >
                      {item.grade}
                    </Typography>
                  </Box>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      )}
    </SectionContainer>
  );
};

export default Education;
