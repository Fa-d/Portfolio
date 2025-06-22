import "./Header.css";
import { useTheme } from "../../utils/ThemeContext.tsx";
import { useNavigate } from 'react-router-dom';

// Direct paths to assets in public folder
const lightImgPath = '/assets/light.png';
const darkImgPath = '/assets/dark.png';
const resumePath = '/assets/MD_SADAKAT_HUSSAIN_FAHAD.pdf';

export default function Header() {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    return (
        <div className="header">
            <div className="img"></div> {/* This div seems to be for a logo, handled by CSS background? */}
            <div className="right-box">
                <div onClick={() => { navigate('/projects') }} className="right-box-item"><b>Projects</b></div>
                <div onClick={() => { navigate('/skills') }} className="right-box-item"><b>Skills</b></div>
                <div onClick={() => { navigate('/articles') }} className="right-box-item"><b>Article</b></div>
                <div onClick={() => { navigate('/') }} className="right-box-item"><b>Home</b></div>
                <a style={{ textDecoration: 'none' }} href={resumePath} target="_blank" rel="noopener noreferrer">
                    <div className="r-corner-card">Resume</div>
                </a>
                <img
                    src={theme === "dark" ? darkImgPath : lightImgPath}
                    onClick={toggleTheme}
                    alt="Toggle theme" // Added alt text
                    style={{ cursor: 'pointer' }} // Indicate it's clickable
                />
            </div>
        </div>
    );
}
