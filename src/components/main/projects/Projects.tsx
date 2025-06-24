import React, { useState, useEffect } from 'react';
import ProjectLanguages from "./ProjectLanguages";
import ProjectLinks from "./ProjectLinks";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { useGlobalLoading } from '../../../utils/GlobalLoadingContext';

// Define interfaces locally or move to a shared types file
export interface ProjectLanguageProps {
    logo: string; 
    url: string; 
}
export interface ProjectLinkProps {
    logo: string;
    url: string;  
}

export interface ProjectProps {
    name: string;
    desc: string;
    languages: ProjectLanguageProps[];
    references: ProjectLinkProps[];
}

const Projects: React.FC = () => {
    const [items, setItems] = useState<ProjectProps[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { setLoading } = useGlobalLoading();

    useEffect(() => {
        const fetchData = async () => {
            setLoading('projects', true);
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
                setLoading('projects', false);
            }
        };
        fetchData();
    }, [setLoading]);

    if (items.length === 0 && !error) {
        return <Typography>No projects found.</Typography>;
    }

    return (
        <Box sx={{ color: 'text.primary', px: { xs: 2, md: 12 }, pb: { xs: 4, md: 8 }, pt: 4 }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' , color: 'text.primary'  }}>Projects</Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 4,
                    width: '100%',
                    justifyContent: 'center',
                }}
            >
                {items.map((item, index) => (
                    <Paper
                        key={item.name || index}
                        elevation={3}
                        sx={{
                            p: 3,
                            borderRadius: 2,
                            flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 30%' },
                            maxWidth: { xs: '100%', sm: '45%', md: '30%' },
                            minHeight: 200,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{item.name}</Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>{item.desc}</Typography>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 'auto' }}>
                            <ProjectLanguages items={item.languages} />
                            <ProjectLinks items={item.references} />
                        </Stack>
                    </Paper>
                ))}
            </Box>
        </Box>
    );
};

export default Projects;

