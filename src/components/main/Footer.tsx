import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ContactItems } from './ContactItems';
import { DEFAULT_NAME, useSiteStrings } from '../../utils/siteStrings';

const navigation = [
    { label: 'Home', to: '/' },
    { label: 'Products', to: '/products' },
    { label: 'Projects', to: '/projects' },
    { label: 'Open Source', to: '/opensource' },
    { label: 'Experience', to: '/experience' },
    { label: 'Skills', to: '/skills' },
    { label: 'Articles', to: '/articles' },
];

const resources = [
    { label: 'Medium', href: 'https://medium.com/@fsadakathussain' },
    { label: 'Codeforces', href: 'https://codeforces.com/profile/faddy_fahad' },
    { label: 'GitHub', href: 'https://github.com/Fa-d' },
];

const linkSx = {
    color: 'rgba(255,255,255,0.75)',
    textDecoration: 'none',
    fontSize: '0.95rem',
    '&:hover': { color: '#fff', textDecoration: 'underline' },
};

const headingSx = {
    color: '#fff',
    fontWeight: 700,
    fontSize: '0.8rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    mb: 2,
};

function LocalTime() {
    const [time, setTime] = useState(() => new Date());

    useEffect(() => {
        const intervalId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(intervalId);
    }, []);

    return <>{time.toLocaleTimeString()}</>;
}

const Footer: React.FC = () => {
    const { data } = useSiteStrings();
    const displayName = data?.FullName || DEFAULT_NAME;

    return (
        <Box
            component="footer"
            sx={{ bgcolor: (theme) => theme.palette.custom.footer, color: '#fff', px: { xs: 2, sm: 3, md: 6 }, pt: { xs: 5, md: 7 }, pb: 3 }}
        >
            <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '2fr 1fr 1fr' },
                        gap: { xs: 4, md: 6 },
                    }}
                >
                    <Box>
                        <Typography sx={{ fontWeight: 700, fontSize: '1.15rem', mb: 1 }}>{displayName}</Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.7)', mb: 2.5, maxWidth: 360 }}>
                            Software engineer building Android, mobile and full-stack apps.
                        </Typography>
                        <ContactItems onDark size={40} />
                    </Box>

                    <Box component="nav" aria-label="Footer">
                        <Typography component="h2" sx={headingSx}>Navigation</Typography>
                        <Box component="ul" sx={{ listStyle: 'none', display: 'grid', gap: 1 }}>
                            {navigation.map((item) => (
                                <li key={item.to}>
                                    <Link component={RouterLink} to={item.to} sx={linkSx}>{item.label}</Link>
                                </li>
                            ))}
                        </Box>
                    </Box>

                    <Box>
                        <Typography component="h2" sx={headingSx}>Elsewhere</Typography>
                        <Box component="ul" sx={{ listStyle: 'none', display: 'grid', gap: 1 }}>
                            {resources.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href} target="_blank" rel="noopener noreferrer" sx={linkSx}>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </Box>
                    </Box>
                </Box>

                <Box
                    sx={{
                        mt: { xs: 4, md: 6 },
                        pt: 3,
                        borderTop: '1px solid rgba(255,255,255,0.12)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 2,
                        color: 'rgba(255,255,255,0.65)',
                        fontSize: '0.875rem',
                    }}
                >
                    <Typography variant="body2">© {new Date().getFullYear()} {displayName}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body2">
                            Local time <Box component="span" sx={{ color: '#fff', fontVariantNumeric: 'tabular-nums' }}><LocalTime /></Box>
                        </Typography>
                        <Tooltip title="Back to top">
                            <IconButton
                                aria-label="Back to top"
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                sx={{ color: '#fff', border: '1px solid rgba(255,255,255,0.25)', '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' } }}
                            >
                                <KeyboardArrowUpIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
