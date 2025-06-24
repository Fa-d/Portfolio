import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import WorkIcon from '@mui/icons-material/Work';
import { useGlobalLoading } from '../../utils/GlobalLoadingContext';

// Image paths are now direct URLs to public/assets
const idImgPath = '/assets/identification-card.png';
const calenderPath = '/assets/calender.png';
const jobLocPath = '/assets/job_loc.png';

// Define the interface locally
interface ExperienceProps {
    date: string;
    role: string;
    company: string;
    description: string; // This was commented out in the original JSX, but exists in data
    skills: string[];
    links?: string[];
}

const CareerSteps: React.FC = () => {
    const [steps, setSteps] = useState<ExperienceProps[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { setLoading } = useGlobalLoading();

    useEffect(() => {
        const fetchData = async () => {
            setLoading('experience', true);
            setError(null);
            try {
                const response = await fetch('/data/career.json');
                if (!response.ok) {
                    throw new Error(`Failed to fetch career data: ${response.statusText}`);
                }
                const data: ExperienceProps[] = await response.json();
                setSteps(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred while fetching career data');
                setSteps([]);
            } finally {
                setLoading('experience', false);
            }
        };

        fetchData();
    }, [setLoading]);

    if (steps.length === 0 && !error) {
        return <Typography>No experience data found.</Typography>;
    }

    return (
        <Box sx={{ color: 'text.primary', px: { xs: 2, md: 12 }, pb: { xs: 4, md: 8 }, pt: 4 }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, textAlign: 'center', color: 'text.primary' }}>Experience</Typography>
            <Box sx={{ position: 'relative', pl: { xs: 4, md: 8 } }}>
                {/* Continuous vertical timeline line (always full height) */}
                <Box
                    sx={{
                        position: 'absolute',
                        left: { xs: 12, md: 12 },
                        top: 0,
                        bottom: 0,
                        width: 2,
                        bgcolor: 'primary.main',
                        zIndex: 0,
                    }}
                />
                {steps.map((item, idx) => (
                    <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', mb: 6, position: 'relative', minHeight: 80 }}>
                        {/* Unique dot with icon */}
                        <Box
                            sx={{
                                position: 'absolute',
                                left: { xs: 0, md: 0 },
                                top: 32,
                                width: 24,
                                height: 24,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 1,
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
                        {/* Card */}
                        <Paper sx={{ ml: { xs: 6, md: 8 }, p: 3, borderRadius: 2, width: '100%' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 2 }}>
                                <Box component="img" src={idImgPath} alt="Role icon" sx={{ width: 30, height: 30, mr: 2 }} />
                                <Typography variant="h5" sx={{ fontWeight: 700 }}>{item.role}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 2 }}>
                                <Box component="img" src={jobLocPath} alt="Company location icon" sx={{ width: 30, height: 30, mr: 1 }} />
                                <Typography variant="h6" sx={{ fontWeight: 600, mr: 4 }}>{item.company}</Typography>
                                <Box component="img" src={calenderPath} alt="Date icon" sx={{ width: 30, height: 30, ml: 4, mr: 1 }} />
                                <Typography variant="subtitle1" color="text.secondary">{item.date}</Typography>
                            </Box>
                            {/* Uncomment if you want to show description */}
                            {/* <Typography variant="body1" sx={{ mt: 2 }}>{item.description}</Typography> */}
                            <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap' }}>
                                {item.skills.map((skill, skillIndex) => (
                                    <Chip key={skillIndex} label={skill} sx={{ mb: 1 }} />
                                ))}
                            </Stack>
                        </Paper>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default CareerSteps;

