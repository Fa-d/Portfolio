import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContactItems } from './ContactItems';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useTheme as useMuiTheme } from '@mui/material/styles';

const arrowImgPath = '/assets/up-arrow.png';

interface SiteStrings {
    FullName?: string;
    // Add other string properties if needed by Footer in future
}

const Footer: React.FC = () => {
    const [time, setTime] = useState(new Date());
    const [siteStrings, setSiteStrings] = useState<SiteStrings>({});
    const navigate = useNavigate();
    const muiTheme = useMuiTheme();

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
    const displayName = siteStrings.FullName || "MD. SADAKAT HUSSAIN FAHAD";

    return (
        <Box component="footer" sx={{ bgcolor: muiTheme.palette.custom.footer, color: '#fff', px: { xs: 1, md: 0 }, py: { xs: 2, md: 5 } }}>
            <Box sx={{ maxWidth: 'lg', mx: 'auto', width: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, justifyContent: 'space-around', alignItems: { xs: 'stretch', md: 'flex-start' } }}>
                    {/* Contact Section */}
                    <Box>
                        <Typography variant="h5" gutterBottom sx={{ color: '#fff' }}>Contact</Typography>
                        <Box sx={{ mb: 2 }}>
                            <ContactItems />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'flex-start', md: 'flex-start' }, mt: 2 }}>
                            <Typography variant="body1" sx={{ fontSize: '1.2em', color: '#fff' }}>© {new Date().getFullYear()}</Typography>
                            <Typography variant="h6" sx={{ fontSize: '1.3em', wordBreak: 'break-word', color: '#fff' }}>{displayName}</Typography>
                        </Box>
                    </Box>
                    {/* Navigation and Resources Section */}
                    <Box>
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                            <Box>
                                <Typography variant="h6" gutterBottom sx={{ color: '#fff' }}>NAVIGATION</Typography>
                                <Divider sx={{ mb: 1, borderColor: '#fff' }} />
                                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                                    <li>
                                        <Button fullWidth variant="text" color="inherit" onClick={scrollToTop} sx={{ justifyContent: 'flex-start', borderRadius: 2, mb: 1, color: '#fff' }}>ABOUT</Button>
                                    </li>
                                    <li>
                                        <Button fullWidth variant="text" color="inherit" onClick={() => navigate('/projects')} sx={{ justifyContent: 'flex-start', borderRadius: 2, mb: 1, color: '#fff' }}>PROJECTS</Button>
                                    </li>
                                    <li>
                                        <Button fullWidth variant="text" color="inherit" onClick={() => navigate('/skills')} sx={{ justifyContent: 'flex-start', borderRadius: 2, mb: 1, color: '#fff' }}>SKILLS</Button>
                                    </li>
                                    <li>
                                        <Button fullWidth variant="text" color="inherit" onClick={() => navigate('/articles')} sx={{ justifyContent: 'flex-start', borderRadius: 2, mb: 1, color: '#fff' }}>ARTICLES</Button>
                                    </li>
                                </Box>
                            </Box>
                            <Box>
                                <Typography variant="h6" gutterBottom sx={{ color: '#fff' }}>RESOURCES</Typography>
                                <Divider sx={{ mb: 1, borderColor: '#fff' }} />
                                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                                    <li>
                                        <Button fullWidth variant="text" color="inherit" href="https://medium.com/@fsadakathussain" target="_blank" sx={{ justifyContent: 'flex-start', borderRadius: 2, mb: 1, color: '#fff' }}>MEDIUM</Button>
                                    </li>
                                    <li>
                                        <Button fullWidth variant="text" color="inherit" href="https://codeforces.com/profile/faddy_fahad" target="_blank" sx={{ justifyContent: 'flex-start', borderRadius: 2, mb: 1, color: '#fff' }}>CONTESTS</Button>
                                    </li>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box>
                        <Box sx={{ display: 'flex', gap: 2, mt: 2, alignItems: 'center' }}>
                            <Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'flex-start', md: 'flex-end' } }}>
                                    <Typography variant="h6" sx={{ mb: 0.5, color: '#fff' }}>LOCAL TIME</Typography>
                                    <Typography variant="body1" sx={{ color: '#fff' }}>{time.toLocaleTimeString()}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-end', md: 'flex-end' } }}>
                                <IconButton onClick={scrollToTop} color="primary" sx={{ width: 50, color: '#fff' }}>
                                    <img src={arrowImgPath} alt="Go to top" style={{ width: 30, height: 30, filter: 'invert(1)' }} />
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
