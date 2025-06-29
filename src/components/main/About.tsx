import { useState, useEffect } from 'react';
import Lottie from 'react-lottie-player';
import { ContactItems } from './ContactItems';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

// Define an interface for the strings data
interface SiteStrings {
    FullName?: string;
    Position?: string;
    Subtitle?: string;
    AboutMeDescription?: string;
    AboutMeDescription2?: string;
    ExportTitle?: string;
}

export default function About() {
    const [strings, setStrings] = useState<SiteStrings>({});
    const [animationData, setAnimationData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            try {
                // Fetch strings data
                const stringsResponse = await fetch('/data/strings.json');
                if (!stringsResponse.ok) {
                    throw new Error(`Failed to fetch strings: ${stringsResponse.statusText}`);
                }
                const stringsData: SiteStrings = await stringsResponse.json();
                setStrings(stringsData);

                // Fetch Lottie animation data
                const animationResponse = await fetch('/assets/person.json');
                if (!animationResponse.ok) {
                    throw new Error(`Failed to fetch animation data: ${animationResponse.statusText}`);
                }
                const animationJson = await animationResponse.json();
                setAnimationData(animationJson);

            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <Typography color="error">Error: {error}</Typography>;
    }

    return (
        <Box sx={{ position: 'relative', px: { xs: 2, md: 12 }, py: { xs: 4, md: 8 }, minHeight: '90vh' }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column-reverse', md: 'row' }, gap: 4, alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ flex: 1 }}>
                    <Box sx={{ pr: { md: 6 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant="h5" sx={{ whiteSpace: 'pre-line', mb: 2, color: 'text.secondary' }}>
                            {strings.AboutMeDescription || ''}
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
                            {strings.FullName || 'Your Name'}
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 500, mb: 1, color: 'text.primary' }}>
                            {strings.Position || 'Your Position'}
                        </Typography>
                        <Typography variant="h5" sx={{ color: 'text.secondary', mb: 10 }}>
                            {strings.Subtitle || 'Your Subtitle'}
                        </Typography>
                        <Typography variant="h6" sx={{ whiteSpace: 'pre-line', mb: 2, color: 'text.secondary' }}>
                            {strings.AboutMeDescription2 || ''}
                        </Typography>

                        <Paper
                            sx={{ display: 'flex', flexDirection: 'column', borderRadius: 2, color: 'text.primary', width: 'fit-content', mt: 3, px: 3, py: 2 }}
                        >
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>{strings.ExportTitle || 'Connect'}</Typography>
                            <ContactItems />
                        </Paper>
                    </Box>
                </Box>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {animationData && (
                        <Lottie
                            loop={true}
                            style={{ width: '100%', height: '100%', maxWidth: 400, maxHeight: 400 }}
                            animationData={animationData}
                            play
                        />
                    )}
                </Box>
            </Box>
        </Box>
    );
}