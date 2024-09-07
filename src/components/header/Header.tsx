import "./Header.css"
import { useTheme, } from "../../utils/ThemeContext.tsx"
import light from '../../assets/light.png'
import dark from '../../assets/dark.png'
import myRes from '../../assets/MD_SADAKAT_HUSSAIN_FAHAD.pdf'
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    return (
        <div className="header">
            <div className="img"></div>
            <div className="right-box">
                <div onClick={() => { navigate('/projects') }} className="right-box-item"><b>Projects</b></div>
                <div onClick={() => { navigate('/skills') }} className="right-box-item"><b>Skills</b></div>
                <div onClick={() => { navigate('/articles') }} className="right-box-item"><b>Article</b></div>
                <div onClick={() => { navigate('/') }} className="right-box-item"><b>Home</b></div>
                <a style={{ textDecoration: 'none' }} href={myRes} target="_blank">
                    <div onClick={() => { }} className="r-corner-card">Resume</div>
                </a>
                <img
                    src={theme === "dark" ? dark : light}
                    onClick={toggleTheme}>
                </img>
            </div>
        </div>
    )
}
