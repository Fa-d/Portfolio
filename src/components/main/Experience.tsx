import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import WorkIcon from '@mui/icons-material/Work';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FolderIcon from '@mui/icons-material/Folder';
import LaunchIcon from '@mui/icons-material/Launch';

// Image paths are now direct URLs to public/assets
const idImgPath = '/assets/identification-card.png';
const calenderPath = '/assets/calender.png';
const jobLocPath = '/assets/job_loc.png';

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
    const [expandedCompanies, setExpandedCompanies] = useState<Set<number>>(new Set());

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            try {
                const response = await fetch('/data/career.json');
                if (!response.ok) {
                    throw new Error(`Failed to fetch career data: ${response.statusText}`);
                }
                const data: CompanyExperience[] = await response.json();
                setCompanies(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred while fetching career data');
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
            window.open(project.url, '_blank', 'noopener,noreferrer');
        }
    };

    if (companies.length === 0 && !error) {
        return <Typography>No experience data found.</Typography>;
    }

    return (
        <Box sx={{ color: 'text.primary', px: { xs: 2, md: 12 }, pb: { xs: 4, md: 8 }, pt: 4 }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, textAlign: 'center', color: 'text.primary' }}>Experience</Typography>
            <Box sx={{ position: 'relative' }}>
                {/* Continuous vertical timeline line */}
                <Box
                    sx={{
                        position: 'absolute',
                        left: { xs: 20, md: 20 },
                        transform: 'translateX(-50%)',
                        top: 0,
                        bottom: 0,
                        width: 2,
                        bgcolor: 'primary.main',
                        zIndex: 0,
                    }}
                />

                {companies.map((company, companyIdx) => (
                    <Box key={companyIdx} sx={{ display: 'flex', alignItems: 'flex-start', mb: 6, minHeight: 80 }}>
                        {/* Timeline Dot Container */}
                        <Box
                            sx={{
                                width: { xs: 40, md: 40 },
                                flexShrink: 0,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                zIndex: 1,
                            }}
                        >
                            <Box
                                sx={{
                                    transform: 'translateY(100%)',
                                    width: 24,
                                    height: 24,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '2px solid',
                                    borderColor: 'primary.main',
                                    borderRadius: '50%',
                                    bgcolor: 'background.paper',
                                }}
                            >
                                <Avatar sx={{ bgcolor: 'primary.main', width: 20, height: 20 }}>
                                    <WorkIcon fontSize="small" />
                                </Avatar>
                            </Box>
                        </Box>

                        {/* Company Card */}
                        <Paper sx={{ p: 3, borderRadius: 2, flexGrow: 1 }}>
                            {/* Company Header - Always Visible */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 2 }}>
                                        <Box component="img" src={jobLocPath} alt="Company icon" sx={{ width: 30, height: 30, mr: 2 }} />
                                        <Typography variant="h6" sx={{ fontWeight: 700 }}>{company.company}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'flex-start', md: 'center' }, mb: 1 }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: { xs: 1, md: 0 } }}>
                                            <Box component="img" src={calenderPath} alt="Date icon" sx={{ width: 24, height: 24, mr: 1 }} />
                                            <Typography variant="subtitle2" color="text.secondary" sx={{ mr: { md: 4 } }}>{company.totalDuration}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <LocationOnIcon sx={{ width: 20, height: 20, mr: 1, color: 'text.secondary' }} />
                                            <Typography variant="subtitle2" color="text.secondary">{company.location}</Typography>
                                        </Box>
                                    </Box>
                                    {company.positions.length > 1 && (
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                            {company.positions.length} positions
                                        </Typography>
                                    )}
                                </Box>
                                {company.positions.length > 1 && (
                                    <IconButton
                                        onClick={() => toggleCompany(companyIdx)}
                                        sx={{ ml: 1 }}
                                        aria-label={expandedCompanies.has(companyIdx) ? 'collapse' : 'expand'}
                                    >
                                        {expandedCompanies.has(companyIdx) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                    </IconButton>
                                )}
                            </Box>

                            {/* Show latest position summary for companies with multiple positions */}
                            {company.positions.length > 1 && !expandedCompanies.has(companyIdx) && (
                                <Box sx={{ pl: 2, borderLeft: '2px solid', borderColor: 'divider', ml: 2 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 1 }}>
                                        <Box component="img" src={idImgPath} alt="Role icon" sx={{ width: 24, height: 24, mr: 2 }} />
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{company.positions[0].role}</Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        Current Role • {company.positions[0].date}
                                    </Typography>
                                    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', rowGap: 1, mb: 2 }}>
                                        {company.positions[0].skills.slice(0, 6).map((skill, skillIndex) => (
                                            <Chip key={skillIndex} label={skill} size="small" sx={{ mb: 1 }} />
                                        ))}
                                        {company.positions[0].skills.length > 6 && (
                                            <Chip label={`+${company.positions[0].skills.length - 6} more`} size="small" variant="outlined" />
                                        )}
                                    </Stack>
                                    {company.positions[0].projects.length > 0 && (
                                        <Box>
                                            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'text.secondary' }}>
                                                Key Projects:
                                            </Typography>
                                            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', rowGap: 1 }}>
                                                {company.positions[0].projects.slice(0, 3).map((project, projectIndex) => (
                                                    <Chip
                                                        key={projectIndex}
                                                        icon={<FolderIcon />}
                                                        label={project.name}
                                                        size="small"
                                                        variant="outlined"
                                                        clickable={!!project.url}
                                                        onClick={() => project.url && handleProjectClick(project)}
                                                        sx={{ 
                                                            mb: 1,
                                                            '&:hover': project.url ? {
                                                                backgroundColor: 'primary.light',
                                                                color: 'primary.contrastText'
                                                            } : {}
                                                        }}
                                                        deleteIcon={project.url ? <LaunchIcon /> : undefined}
                                                        onDelete={project.url ? () => handleProjectClick(project) : undefined}
                                                    />
                                                ))}
                                                {company.positions[0].projects.length > 3 && (
                                                    <Chip 
                                                        label={`+${company.positions[0].projects.length - 3} more projects`} 
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
                                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 1 }}>
                                        <Box component="img" src={idImgPath} alt="Role icon" sx={{ width: 24, height: 24, mr: 2 }} />
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{company.positions[0].role}</Typography>
                                    </Box>
                                    <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                                        {company.positions[0].description}
                                    </Typography>
                                    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', rowGap: 1, mb: 2 }}>
                                        {company.positions[0].skills.map((skill, skillIndex) => (
                                            <Chip key={skillIndex} label={skill} sx={{ mb: 1 }} />
                                        ))}
                                    </Stack>
                                    {company.positions[0].projects.length > 0 && (
                                        <Box>
                                            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'text.secondary' }}>
                                                Projects:
                                            </Typography>
                                            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', rowGap: 1 }}>
                                                {company.positions[0].projects.map((project, projectIndex) => (
                                                    <Chip
                                                        key={projectIndex}
                                                        icon={<FolderIcon />}
                                                        label={project.name}
                                                        size="small"
                                                        variant="outlined"
                                                        clickable={!!project.url}
                                                        onClick={() => project.url && handleProjectClick(project)}
                                                        sx={{ 
                                                            mb: 1,
                                                            '&:hover': project.url ? {
                                                                backgroundColor: 'primary.light',
                                                                color: 'primary.contrastText'
                                                            } : {}
                                                        }}
                                                        deleteIcon={project.url ? <LaunchIcon /> : undefined}
                                                        onDelete={project.url ? () => handleProjectClick(project) : undefined}
                                                    />
                                                ))}
                                            </Stack>
                                        </Box>
                                    )}
                                </Box>
                            )}

                            {/* Expanded positions for multi-position companies */}
                            <Collapse in={expandedCompanies.has(companyIdx)} timeout="auto" unmountOnExit>
                                <Box sx={{ mt: 2 }}>
                                    {company.positions.map((position, posIdx) => (
                                        <Box key={posIdx} sx={{ 
                                            pl: 2, 
                                            borderLeft: '2px solid', 
                                            borderColor: 'divider', 
                                            ml: 2,
                                            mb: posIdx < company.positions.length - 1 ? 3 : 0
                                        }}>
                                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 1 }}>
                                                <Box component="img" src={idImgPath} alt="Role icon" sx={{ width: 24, height: 24, mr: 2 }} />
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{position.role}</Typography>
                                            </Box>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                                {position.date}
                                            </Typography>
                                            <Typography variant="body2" sx={{ mb: 2, color: 'text.primary' }}>
                                                {position.description}
                                            </Typography>
                                            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', rowGap: 1, mb: 2 }}>
                                                {position.skills.map((skill, skillIndex) => (
                                                    <Chip key={skillIndex} label={skill} size="small" sx={{ mb: 1 }} />
                                                ))}
                                            </Stack>
                                            {position.projects.length > 0 && (
                                                <Box>
                                                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'text.secondary' }}>
                                                        Projects:
                                                    </Typography>
                                                    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', rowGap: 1 }}>
                                                        {position.projects.map((project, projectIndex) => (
                                                            <Chip
                                                                key={projectIndex}
                                                                icon={<FolderIcon />}
                                                                label={project.name}
                                                                size="small"
                                                                variant="outlined"
                                                                clickable={!!project.url}
                                                                onClick={() => project.url && handleProjectClick(project)}
                                                                sx={{ 
                                                                    mb: 1,
                                                                    '&:hover': project.url ? {
                                                                        backgroundColor: 'primary.light',
                                                                        color: 'primary.contrastText'
                                                                    } : {}
                                                                }}
                                                                deleteIcon={project.url ? <LaunchIcon /> : undefined}
                                                                onDelete={project.url ? () => handleProjectClick(project) : undefined}
                                                            />
                                                        ))}
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
    );
};

export default CareerSteps;

