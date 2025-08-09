import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { keyframes } from "@mui/system";
import SchoolIcon from "@mui/icons-material/School";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

// Define the interface locally
export interface EducationProps {
  institution: string;
  date: string;
  degree: string;
  grade: string;
}

const Education: React.FC = () => {
  const [steps, setSteps] = useState<EducationProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const response = await fetch("/data/education.json");
        if (!response.ok) {
          throw new Error(
            `Failed to fetch education data: ${response.statusText}`
          );
        }
        const data: EducationProps[] = await response.json();
        setSteps(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An unknown error occurred while fetching education data"
        );
        setSteps([]);
      } finally {
      }
    };

    fetchData();
  }, []);

  if (steps.length === 0 && !error) {
    return <Typography>No education data found.</Typography>;
  }

  const fadeInUp = keyframes`
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    `;

  const slideInLeft = keyframes`
        from { opacity: 0; transform: translateX(-50px); }
        to { opacity: 1; transform: translateX(0); }
    `;

  const staggerDelay = (index: number) => `${index * 0.2}s`;

  return (
    <Box
      sx={{
        color: "text.primary",
        px: { xs: 2, md: 12 },
        py: { xs: 4, md: 8 },
        position: "relative",
        bgcolor: "background.default",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "radial-gradient(circle at 30% 70%, rgba(118, 75, 162, 0.05) 0%, transparent 50%)"
              : "radial-gradient(circle at 30% 70%, rgba(118, 75, 162, 0.03) 0%, transparent 50%)",
          zIndex: 1,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 6,
          zIndex: 2,
          position: "relative",
          animation: `${slideInLeft} 1s ease-out`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 600, color: "text.primary" }}
          >
            Education
          </Typography>
        </Box>
      </Box>
      <Timeline
        position="alternate"
        sx={{ zIndex: 2, position: "relative", px: 0 }}
      >
        {steps.map((item, index) => (
          <TimelineItem key={item.institution}>
            <TimelineSeparator>
              <TimelineDot
                sx={{
                  bgcolor: "primary.main",
                  width: 60,
                  height: 60,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "4px solid",
                  borderColor: "background.paper",
                  boxShadow: (theme) =>
                    theme.palette.mode === "dark"
                      ? "0 4px 15px rgba(0, 0, 0, 0.4)"
                      : "0 4px 15px rgba(0, 0, 0, 0.1)",
                }}
              >
                <SchoolIcon sx={{ color: "white", fontSize: 30 }} />
              </TimelineDot>
              {index < steps.length - 1 && (
                <TimelineConnector
                  sx={{
                    background:
                      "linear-gradient(180deg, #667eea 0%, #764ba2 100%)",
                    width: 3,
                    minHeight: 80,
                  }}
                />
              )}
            </TimelineSeparator>
            <TimelineContent sx={{ py: 1, px: 2 }}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  boxShadow: (theme) =>
                    theme.palette.mode === "dark"
                      ? "0 8px 30px rgba(0, 0, 0, 0.3)"
                      : "0 8px 30px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  animation: `${fadeInUp} 0.8s ease-out ${staggerDelay(
                    index
                  )} both`,
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "5px",
                    background:
                      "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "24px 24px 0 0",
                  },
                  "&:hover": {
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: "text.primary",
                    lineHeight: 1.3,
                    mb: 1,
                  }}
                >
                  {item.degree}
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "primary.main",
                    mb: 2,
                  }}
                >
                  {item.institution}
                </Typography>

                <Box
                  sx={{
                    height: "1px",
                    bgcolor: "divider",
                    mx: -3,
                    my: 2,
                    borderRadius: "1px",
                  }}
                />

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CalendarTodayIcon
                      sx={{ fontSize: 18, color: "text.secondary" }}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        color: "text.secondary",
                        fontWeight: 500,
                        bgcolor: "action.hover",
                        px: 2,
                        py: 0.5,
                        borderRadius: 2,
                        fontSize: "0.875rem",
                      }}
                    >
                      {item.date}
                    </Typography>
                  </Box>
                  
                <Typography
                    variant="body1"
                    sx={{
                        fontWeight: 600,
                        bgcolor: "secondary.light",
                        color: "secondary.contrastText",
                        px: 2,
                        py: 0.5,
                        borderRadius: 2,
                        fontSize: "0.875rem",
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
    </Box>
  );
};

export default Education;
