import React, { useState, useEffect } from 'react';
import { openInNewTab } from '../../utils/NewTab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';

// Define the interface locally or import from a shared types file later
export interface ArticlesNoteProps {
    title: string;
    date: string;
    url: string;
}

const ArticleNote: React.FC<{ isArticle: boolean }> = ({ isArticle }) => {
    const [items, setItems] = useState<ArticlesNoteProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            const dataType = isArticle ? 'articles' : 'notes';
            try {
                const response = await fetch(`/data/${dataType}.json`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch ${dataType} data: ${response.statusText}`);
                }
                const data: ArticlesNoteProps[] = await response.json();
                setItems(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : `An unknown error occurred while fetching ${dataType}`);
                setItems([]); // Clear items on error or set to default
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [isArticle]);

    if (loading) {
        return <Typography>Loading {isArticle ? 'articles' : 'notes'}...</Typography>;
    }

    if (error) {
        return <Typography color="error">Error: {error}</Typography>;
    }

    if (items.length === 0) {
        return <Typography>No {isArticle ? 'articles' : 'notes'} found.</Typography>;
    }

    return (
        <Box sx={{ bgcolor: 'background.paper', color: 'text.primary', px: { xs: 2, md: 12 }, pb: { xs: 4, md: 8 }, pt: 4, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
                {isArticle ? 'ARTICLES' : 'NOTES'}
            </Typography>
            {items.map((item, index) => (
                <Paper
                    key={item.url || index}
                    elevation={2}
                    sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', p: 2, mb: 2, cursor: isArticle && item.url ? 'pointer' : 'default', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: isArticle && item.url ? 6 : 2 } }}
                    onClick={() => {
                        if (isArticle && item.url) {
                            openInNewTab(item.url);
                        }
                    }}
                >
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography variant="subtitle1" color="text.secondary">{item.date}</Typography>
                </Paper>
            ))}
            <Divider sx={{ mt: 4 }} />
        </Box>
    );
};

export default ArticleNote;