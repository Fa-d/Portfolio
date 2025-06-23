import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContactItems } from './ContactItems';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

const arrowImgPath = '/assets/up-arrow.png';

interface SiteStrings {
    FullName?: string;
    // Add other string properties if needed by Footer in future
}

const Footer: React.FC = () => {
    const [time, setTime] = useState(new Date());
    const [siteStrings, setSiteStrings] = useState<SiteStrings>({});
    const [loadingStrings, setLoadingStrings] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        // Fetch site strings
        const fetchStrings = async () => {
            try {
                const response = await fetch('/data/strings.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch site strings');
                }
                const data: SiteStrings = await response.json();
                setSiteStrings(data);
            } catch (error) {
                console.error("Error fetching site strings for Footer:", error);
                // Set default or handle error appropriately
                setSiteStrings({ FullName: "MD. SADAKAT HUSSAIN FAHAD" }); // Fallback
            } finally {
                setLoadingStrings(false);
            }
        };

        fetchStrings();
        return () => clearInterval(intervalId);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    // Display a loading state or default content until strings are loaded
    const displayName = loadingStrings ? "Loading..." : (siteStrings.FullName || "MD. SADAKAT HUSSAIN FAHAD");

    return (
        <Box component="footer" sx={{ bgcolor: 'secondary.main', color: 'text.primary', p: { xs: 2, md: 5 }, mt: 4 }}>
            <Grid container spacing={4} justifyContent="space-evenly" alignItems="flex-start">
                <Grid item xs={12} md={4}>
                    <Typography variant="h5" gutterBottom>Contact</Typography>
                    <Box sx={{ mb: 2 }}>
                        <ContactItems />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Typography variant="body1" sx={{ fontSize: '1.5em' }}>© {new Date().getFullYear()}</Typography>
                        <Typography variant="h4" sx={{ fontSize: '2em' }}>{displayName}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={7}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" gutterBottom>NAVIGATION</Typography>
                            <Divider sx={{ mb: 1 }} />
                            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                                <li>
                                    <Button fullWidth variant="text" color="inherit" onClick={scrollToTop} sx={{ justifyContent: 'flex-start', borderRadius: 2, mb: 1 }}>ABOUT</Button>
                                </li>
                                <li>
                                    <Button fullWidth variant="text" color="inherit" onClick={() => navigate('/projects')} sx={{ justifyContent: 'flex-start', borderRadius: 2, mb: 1 }}>PROJECTS</Button>
                                </li>
                                <li>
                                    <Button fullWidth variant="text" color="inherit" onClick={() => navigate('/skills')} sx={{ justifyContent: 'flex-start', borderRadius: 2, mb: 1 }}>SKILLS</Button>
                                </li>
                                <li>
                                    <Button fullWidth variant="text" color="inherit" onClick={() => navigate('/articles')} sx={{ justifyContent: 'flex-start', borderRadius: 2, mb: 1 }}>ARTICLES</Button>
                                </li>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" gutterBottom>RESOURCES</Typography>
                            <Divider sx={{ mb: 1 }} />
                            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                                <li>
                                    <Button fullWidth variant="text" color="inherit" href="https://medium.com/@fsadakathussain" target="_blank" sx={{ justifyContent: 'flex-start', borderRadius: 2, mb: 1 }}>MEDIUM</Button>
                                </li>
                                <li>
                                    <Button fullWidth variant="text" color="inherit" href="https://codeforces.com/profile/faddy_fahad" target="_blank" sx={{ justifyContent: 'flex-start', borderRadius: 2, mb: 1 }}>CONTESTS</Button>
                                </li>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ mt: 2 }} alignItems="center">
                        <Grid item xs={6}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'flex-start', md: 'flex-end' } }}>
                                <Typography variant="h6" sx={{ mb: 0.5 }}>LOCAL TIME</Typography>
                                <Typography variant="body1">{time.toLocaleTimeString()}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                            <IconButton onClick={scrollToTop} color="primary" sx={{ width: 70 }}>
                                <img src={arrowImgPath} alt="Go to top" style={{ width: 30, height: 30 }} />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Footer;
