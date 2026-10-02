import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import WorkIcon from "@mui/icons-material/Work";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FolderIcon from "@mui/icons-material/Folder";
import LaunchIcon from "@mui/icons-material/Launch";

// Image paths are now direct URLs to public/assets
const idImgPath = "/assets/identification-card.png";
const calenderPath = "/assets/calender.png";
const jobLocPath = "/assets/job_loc.png";

// Define the interfaces for the new structure
interface Project {
  name: string;
  description: string;
  url?: string;
}

interface Position {
  role: string;
  date: string;
  description: string;
  skills: string[];
  projects: Project[];
}

interface CompanyExperience {
  company: string;
  totalDuration: string;
  location: string;
  positions: Position[];
}

const CareerSteps: React.FC = () => {
  const [companies, setCompanies] = useState<CompanyExperience[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [expandedCompanies, setExpandedCompanies] = useState<Set<number>>(
    new Set()
  );

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const response = await fetch("/data/career.json");
        if (!response.ok) {
          throw new Error(
            `Failed to fetch career data: ${response.statusText}`
          );
        }
        const data: CompanyExperience[] = await response.json();
        setCompanies(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An unknown error occurred while fetching career data"
        );
        setCompanies([]);
      } finally {
      }
    };

    fetchData();
  }, []);

  const toggleCompany = (index: number) => {
    const newExpanded = new Set(expandedCompanies);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedCompanies(newExpanded);
  };

  const handleProjectClick = (project: Project) => {
    if (project.url) {
      window.open(project.url, "_blank", "noopener,noreferrer");
    }
  };

  if (companies.length === 0 && !error) {
    return <Typography>No experience data found.</Typography>;
  }

  return (
    <Box
      sx={{
        color: "text.primary",
        position: "relative",
        minHeight: "100vh",
        py: { xs: 4, md: 8 },
        // Progressive background elements for large screens
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: {
            xs: "transparent",
            md: `radial-gradient(circle at 20% 30%, rgba(25, 118, 210, 0.05) 0%, transparent 50%),
                              radial-gradient(circle at 80% 70%, rgba(156, 39, 176, 0.04) 0%, transparent 50%),
                              linear-gradient(135deg, rgba(25, 118, 210, 0.02) 0%, transparent 50%)`,
          },
          zIndex: -2,
        },
        // Geometric accent shapes
        "&::after": {
          content: '""',
          position: "absolute",
          top: { xs: 0, md: "10%" },
          right: { xs: 0, md: "5%" },
          width: { xs: 0, md: 300, lg: 400 },
          height: { xs: 0, md: 300, lg: 400 },
          background: "rgba(25, 118, 210, 0.03)",
          borderRadius: "50% 20% 50% 20%",
          transform: "rotate(45deg)",
          zIndex: -1,
          display: { xs: "none", md: "block" },
        },
      }}
    >
      {/* Content Container with Progressive Centering */}
      <Box
        sx={{
          maxWidth: {
            xs: "100%",
            sm: "90%",
            md: "85%",
            lg: "1200px",
            xl: "1400px",
          },
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4, lg: 6 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: { xs: 3, md: 5, lg: 6 },
            fontWeight: 600,
            textAlign: "center",
            color: "text.primary",
            fontSize: { xs: "2rem", md: "2.5rem", lg: "3rem" },
            letterSpacing: { xs: 0, md: "-0.5px", lg: "-1px" },
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: { xs: -8, md: -12 },
              left: "50%",
              transform: "translateX(-50%)",
              width: { xs: 60, md: 80, lg: 100 },
              height: 3,
              background:
                "linear-gradient(90deg, transparent, rgba(25, 118, 210, 0.6), transparent)",
              borderRadius: 2,
            },
          }}
        >
          Experience
        </Typography>
        <Box sx={{ position: "relative" }}>
          {/* Continuous vertical timeline line */}
          <Box
            sx={{
              position: "absolute",
              left: { xs: 20, md: 20 },
              transform: "translateX(-50%)",
              top: 0,
              bottom: 0,
              width: { xs: 2, md: 3 },
              background: (theme) => `linear-gradient(180deg, 
                            ${theme.palette.primary.main}00 0%, 
                            ${theme.palette.primary.main} 10%, 
                            ${theme.palette.primary.main} 90%, 
                            ${theme.palette.primary.main}00 100%)`,
              borderRadius: 2,
              zIndex: 0,
            }}
          />

          {companies.map((company, companyIdx) => (
            <Box
              key={companyIdx}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                mb: { xs: 4, md: 6, lg: 8 },
                minHeight: 80,
                // Add subtle hover effect for the entire timeline item
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: { xs: "none", md: "translateY(-2px)" },
                },
              }}
            >
              {/* Timeline Dot Container */}
              <Box
                sx={{
                  width: { xs: 40, md: 40 },
                  flexShrink: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 1,
                }}
              >
                <Box
                  sx={{
                    transform: "translateY(100%)",
                    width: { xs: 24, md: 32 },
                    height: { xs: 24, md: 32 },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "3px solid",
                    borderColor: "primary.main",
                    borderRadius: "50%",
                    bgcolor: "background.paper",
                    boxShadow: "0 0 0 4px rgba(25, 118, 210, 0.1)",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(100%) scale(1.1)",
                      boxShadow: "0 0 0 6px rgba(25, 118, 210, 0.15)",
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      width: { xs: 18, md: 24 },
                      height: { xs: 18, md: 24 },
                      background: (theme) =>
                        `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    }}
                  >
                    <WorkIcon fontSize="small" />
                  </Avatar>
                </Box>
              </Box>

              {/* Company Card */}
              <Paper
                sx={{
                  p: { xs: 2, md: 3, lg: 4 },
                  borderRadius: { xs: 2, md: 3 },
                  flexGrow: 1,
                  boxShadow: {
                    xs: 1,
                    md: "0 4px 20px rgba(0,0,0,0.08)",
                    lg: "0 8px 32px rgba(0,0,0,0.1)",
                  },
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: {
                      xs: 2,
                      md: "0 8px 32px rgba(0,0,0,0.12)",
                      lg: "0 12px 48px rgba(0,0,0,0.15)",
                    },
                  },
                  backdrop: "blur(10px)",
                  background: (theme) => `${theme.palette.background.paper}f0`,
                }}
              >
                {/* Company Header - Always Visible */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
                  <Box sx={{ flexGrow: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Box
                        component="img"
                        src={jobLocPath}
                        alt="Company icon"
                        sx={{ width: 30, height: 30, mr: 2 }}
                      />
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {company.company}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        alignItems: { xs: "flex-start", md: "center" },
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          mb: { xs: 1, md: 0 },
                        }}
                      >
                        <Box
                          component="img"
                          src={calenderPath}
                          alt="Date icon"
                          sx={{ width: 24, height: 24, mr: 1 }}
                        />
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          sx={{ mr: { md: 4 } }}
                        >
                          {company.totalDuration}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <LocationOnIcon
                          sx={{
                            width: 20,
                            height: 20,
                            mr: 1,
                            color: "text.secondary",
                          }}
                        />
                        <Typography variant="subtitle2" color="text.secondary">
                          {company.location}
                        </Typography>
                      </Box>
                    </Box>
                    {company.positions.length > 1 && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        {company.positions.length} positions
                      </Typography>
                    )}
                  </Box>
                  {company.positions.length > 1 && (
                    <IconButton
                      onClick={() => toggleCompany(companyIdx)}
                      sx={{ ml: 1 }}
                      aria-label={
                        expandedCompanies.has(companyIdx)
                          ? "collapse"
                          : "expand"
                      }
                    >
                      {expandedCompanies.has(companyIdx) ? (
                        <ExpandLessIcon />
                      ) : (
                        <ExpandMoreIcon />
                      )}
                    </IconButton>
                  )}
                </Box>

                {/* Show latest position summary for companies with multiple positions */}
                {company.positions.length > 1 &&
                  !expandedCompanies.has(companyIdx) && (
                    <Box
                      sx={{
                        pl: 2,
                        borderLeft: "2px solid",
                        borderColor: "divider",
                        ml: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          mb: 1,
                        }}
                      >
                        <Box
                          component="img"
                          src={idImgPath}
                          alt="Role icon"
                          sx={{ width: 24, height: 24, mr: 2 }}
                        />
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 600 }}
                        >
                          {company.positions[0].role}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        Current Role • {company.positions[0].date}
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ flexWrap: "wrap", rowGap: 1, mb: 2 }}
                      >
                        {company.positions[0].skills
                          .slice(0, 6)
                          .map((skill, skillIndex) => (
                            <Chip
                              key={skillIndex}
                              label={skill}
                              size="small"
                              sx={{ mb: 1 }}
                            />
                          ))}
                        {company.positions[0].skills.length > 6 && (
                          <Chip
                            label={`+${
                              company.positions[0].skills.length - 6
                            } more`}
                            size="small"
                            variant="outlined"
                          />
                        )}
                      </Stack>
                      {company.positions[0].projects.length > 0 && (
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                              mb: 1,
                              color: "text.secondary",
                            }}
                          >
                            Key Projects:
                          </Typography>
                          <Stack
                            direction="row"
                            spacing={1}
                            sx={{ flexWrap: "wrap", rowGap: 1 }}
                          >
                            {company.positions[0].projects
                              .slice(0, 3)
                              .map((project, projectIndex) => (
                                <Chip
                                  key={projectIndex}
                                  icon={<FolderIcon />}
                                  label={project.name}
                                  size="small"
                                  variant="outlined"
                                  clickable={!!project.url}
                                  onClick={() =>
                                    project.url && handleProjectClick(project)
                                  }
                                  sx={{
                                    mb: 1,
                                    "&:hover": project.url
                                      ? {
                                          backgroundColor: "primary.light",
                                          color: "primary.contrastText",
                                        }
                                      : {},
                                  }}
                                  deleteIcon={
                                    project.url ? <LaunchIcon /> : undefined
                                  }
                                  onDelete={
                                    project.url
                                      ? () => handleProjectClick(project)
                                      : undefined
                                  }
                                />
                              ))}
                            {company.positions[0].projects.length > 3 && (
                              <Chip
                                label={`+${
                                  company.positions[0].projects.length - 3
                                } more projects`}
                                size="small"
                                variant="outlined"
                                sx={{ opacity: 0.7 }}
                              />
                            )}
                          </Stack>
                        </Box>
                      )}
                    </Box>
                  )}

                {/* Single position company - show directly */}
                {company.positions.length === 1 && (
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Box
                        component="img"
                        src={idImgPath}
                        alt="Role icon"
                        sx={{ width: 24, height: 24, mr: 2 }}
                      />
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {company.positions[0].role}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ mb: 2, color: "text.secondary" }}
                    >
                      {(company.positions[0].description ?? "")
                        .split("\n")
                        .map((line, idx) => (
                          <React.Fragment key={idx}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ flexWrap: "wrap", rowGap: 1, mb: 2 }}
                    >
                      {company.positions[0].skills.map((skill, skillIndex) => (
                        <Chip key={skillIndex} label={skill} sx={{ mb: 1 }} />
                      ))}
                    </Stack>
                    {company.positions[0].projects.length > 0 && (
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            mb: 1,
                            color: "text.secondary",
                          }}
                        >
                          Projects:
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ flexWrap: "wrap", rowGap: 1 }}
                        >
                          {company.positions[0].projects.map(
                            (project, projectIndex) => (
                              <Chip
                                key={projectIndex}
                                icon={<FolderIcon />}
                                label={project.name}
                                size="small"
                                variant="outlined"
                                clickable={!!project.url}
                                onClick={() =>
                                  project.url && handleProjectClick(project)
                                }
                                sx={{
                                  mb: 1,
                                  "&:hover": project.url
                                    ? {
                                        backgroundColor: "primary.light",
                                        color: "primary.contrastText",
                                      }
                                    : {},
                                }}
                                deleteIcon={
                                  project.url ? <LaunchIcon /> : undefined
                                }
                                onDelete={
                                  project.url
                                    ? () => handleProjectClick(project)
                                    : undefined
                                }
                              />
                            )
                          )}
                        </Stack>
                      </Box>
                    )}
                  </Box>
                )}

                {/* Expanded positions for multi-position companies */}
                <Collapse
                  in={expandedCompanies.has(companyIdx)}
                  timeout="auto"
                  unmountOnExit
                >
                  <Box sx={{ mt: 2 }}>
                    {company.positions.map((position, posIdx) => (
                      <Box
                        key={posIdx}
                        sx={{
                          pl: 2,
                          borderLeft: "2px solid",
                          borderColor: "divider",
                          ml: 2,
                          mb: posIdx < company.positions.length - 1 ? 3 : 0,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            mb: 1,
                          }}
                        >
                          <Box
                            component="img"
                            src={idImgPath}
                            alt="Role icon"
                            sx={{ width: 24, height: 24, mr: 2 }}
                          />
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 600 }}
                          >
                            {position.role}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 2 }}
                        >
                          {position.date}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ mb: 2, color: "text.primary" }}
                        >
                          {position.description}
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ flexWrap: "wrap", rowGap: 1, mb: 2 }}
                        >
                          {position.skills.map((skill, skillIndex) => (
                            <Chip
                              key={skillIndex}
                              label={skill}
                              size="small"
                              sx={{ mb: 1 }}
                            />
                          ))}
                        </Stack>
                        {position.projects.length > 0 && (
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 600,
                                mb: 1,
                                color: "text.secondary",
                              }}
                            >
                              Projects:
                            </Typography>
                            <Stack
                              direction="row"
                              spacing={1}
                              sx={{ flexWrap: "wrap", rowGap: 1 }}
                            >
                              {position.projects.map(
                                (project, projectIndex) => (
                                  <Chip
                                    key={projectIndex}
                                    icon={<FolderIcon />}
                                    label={project.name}
                                    size="small"
                                    variant="outlined"
                                    clickable={!!project.url}
                                    onClick={() =>
                                      project.url && handleProjectClick(project)
                                    }
                                    sx={{
                                      mb: 1,
                                      "&:hover": project.url
                                        ? {
                                            backgroundColor: "primary.light",
                                            color: "primary.contrastText",
                                          }
                                        : {},
                                    }}
                                    deleteIcon={
                                      project.url ? <LaunchIcon /> : undefined
                                    }
                                    onDelete={
                                      project.url
                                        ? () => handleProjectClick(project)
                                        : undefined
                                    }
                                  />
                                )
                              )}
                            </Stack>
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Box>
                </Collapse>
              </Paper>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CareerSteps;
