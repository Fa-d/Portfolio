import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

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
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
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
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Typography>Loading experience...</Typography>;
    }

    if (error) {
        return <Typography color="error">Error: {error}</Typography>;
    }

    if (steps.length === 0) {
        return <Typography>No experience data found.</Typography>;
    }

    return (
        <Box sx={{ bgcolor: 'background.paper', color: 'text.primary', px: { xs: 2, md: 12 }, pb: { xs: 4, md: 8 }, pt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>EXPERIENCE</Typography>
            <Stack spacing={4} sx={{ width: '100%' }}>
                {steps.map((item, index) => (
                    <Paper key={item.company || index} elevation={3} sx={{ p: 3, borderRadius: 2, width: '100%' }}>
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
                ))}
            </Stack>
        </Box>
    );
};

export default CareerSteps;

