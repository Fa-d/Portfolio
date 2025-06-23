import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from "../../utils/ThemeContext.tsx";
import { useNavigate } from 'react-router-dom';
import Logo from '/assets/logo.png';

// Direct paths to assets in public folder
const lightImgPath = '/assets/light.png';
const darkImgPath = '/assets/dark.png';
const resumePath = '/assets/MD_SADAKAT_HUSSAIN_FAHAD.pdf';

export default function Header() {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    return (
        <AppBar position="sticky" color="default" elevation={2} sx={{ mb: 2 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}> 
                    <img src={Logo} alt="Logo" style={{ height: 40, marginRight: 16 }} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Faddy's Portfolio
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button color="inherit" onClick={() => navigate('/projects')}>Projects</Button>
                    <Button color="inherit" onClick={() => navigate('/skills')}>Skills</Button>
                    <Button color="inherit" onClick={() => navigate('/articles')}>Articles</Button>
                    <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        href={resumePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ borderRadius: 5, ml: 2 }}
                        endIcon={<span style={{ marginLeft: 4 }}>&rarr;</span>}
                    >
                        Resume
                    </Button>
                    <IconButton onClick={toggleTheme} color="inherit" sx={{ ml: 2 }}>
                        <img
                            src={theme === "dark" ? darkImgPath : lightImgPath}
                            alt="Toggle theme"
                            style={{ height: 30, width: 30 }}
                        />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
