import React, { useState, useEffect } from 'react';
import ProjectLanguages from "./ProjectLanguages";
import ProjectLinks from "./ProjectLinks";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

// Define interfaces locally or move to a shared types file
export interface ProjectLanguageProps {
    logo: string; // Path to image, e.g., /assets/kotlin.png
    url: string;  // This was empty in original data, but keeping for structure
}

export interface ProjectLinkProps {
    logo: string; // Path to image, e.g., /assets/github.png
    url: string;  // URL to the project or live site
}

export interface ProjectProps {
    name: string;
    desc: string;
    languages: ProjectLanguageProps[];
    references: ProjectLinkProps[];
}

const Projects: React.FC = () => {
    const [items, setItems] = useState<ProjectProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('/data/projects.json');
                if (!response.ok) {
                    throw new Error(`Failed to fetch projects data: ${response.statusText}`);
                }
                const data: ProjectProps[] = await response.json();
                setItems(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred while fetching projects');
                setItems([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Typography>Loading projects...</Typography>;
    }

    if (error) {
        return <Typography color="error">Error: {error}</Typography>;
    }

    if (items.length === 0) {
        return <Typography>No projects found.</Typography>;
    }

    return (
        <Box sx={{ bgcolor: 'background.paper', color: 'text.primary', px: { xs: 2, md: 12 }, pb: { xs: 4, md: 8 }, pt: 4 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>PROJECTS</Typography>
            <Grid container spacing={4}>
                {items.map((item, index) => (
                    <Grid item xs={12} md={6} key={item.name || index}>
                        <Paper elevation={3} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{item.name}</Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>{item.desc}</Typography>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <ProjectLanguages items={item.languages} />
                                <ProjectLinks items={item.references} />
                            </Stack>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Projects;

