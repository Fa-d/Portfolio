import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

// Define the interface locally
export interface EducationProps {
    institution: string;
    date: string;
    degree: string;
}

const Education: React.FC = () => {
    const [steps, setSteps] = useState<EducationProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('/data/education.json');
                if (!response.ok) {
                    throw new Error(`Failed to fetch education data: ${response.statusText}`);
                }
                const data: EducationProps[] = await response.json();
                setSteps(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred while fetching education data');
                setSteps([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Typography>Loading education...</Typography>;
    }

    if (error) {
        return <Typography color="error">Error: {error}</Typography>;
    }

    if (steps.length === 0) {
        return <Typography>No education data found.</Typography>;
    }

    return (
        <Box sx={{ color: 'text.primary', px: { xs: 2, md: 12 }, py: { xs: 4, md: 8 }, position: 'relative' }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, textAlign: 'center', color: 'text.primary' }}>Education</Typography>
            <Grid container spacing={4} justifyContent="flex-start">
                {steps.map(item => (
                    <Grid key={item.institution}>
                        <Paper elevation={2} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                            <Typography variant="h5" sx={{ mt: 2, fontWeight: 700 }}>{item.degree}</Typography>
                            <Typography variant="subtitle1" sx={{ my: 2, fontSize: 20 }}>{item.date}</Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>{item.institution}</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Education;

