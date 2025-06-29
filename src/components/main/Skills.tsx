import React, { useState, useEffect } from 'react';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Define the interface locally
export interface SkillsProps {
    title: string;
    image: string; // Path to image, e.g., /assets/kotlin.png
}

const Skills: React.FC = () => {
    const [items, setItems] = useState<SkillsProps[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            try {
                const response = await fetch('/data/skills.json');
                if (!response.ok) {
                    throw new Error(`Failed to fetch skills data: ${response.statusText}`);
                }
                const data: SkillsProps[] = await response.json();
                setItems(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred while fetching skills');
                setItems([]);
            } finally {
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (error) {
        return <Typography color="error">Error: {error}</Typography>;
    }

    if (items.length === 0) {
        return <Typography>No skills found.</Typography>;
    }

    return (
        <Box sx={{ maxWidth: 700, mx: 'auto', my: 4, px: 2 }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, textAlign: 'center', color: 'text.primary' }}>Skills</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
                {items.map((item, index) => (
                    <Box key={item.title || index}>
                        <Paper
                            elevation={2}
                            sx={{
                                p: 2,
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: 3,
                                minHeight: 60,
                                transition: 'box-shadow 0.2s, transform 0.2s',
                                cursor: 'pointer',
                                '&:hover': {
                                    boxShadow: 8,
                                    transform: 'translateY(-1px) scale(1.03)',
                                },
                            }}
                        >
                            <Box component="img" src={item.image} alt={item.title} sx={{ height: 36, width: 36, mr: 2 }} />
                            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{item.title}</Typography>
                        </Paper>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Skills;