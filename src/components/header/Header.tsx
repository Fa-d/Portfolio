import "./Header.css"
import { useTheme, } from "../../context/ThemeContext.tsx"

import logo from '../../assets/logo.png'
import light from '../../assets/light.png'
import dark from '../../assets/dark.png'

export default function Header() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="header">
            <div className="img">
                <img src={logo} />
            </div>
            <div className="right-box">
                <div onClick={() => { }} className="right-box-item"><b>Projects</b></div>
                <div onClick={() => { }} className="right-box-item"><b>Contact</b></div>
                <div onClick={() => { }} className="right-box-item"><b>Blogs</b></div>
                <div onClick={() => { }} className="r-corner-card">
                    Resume
                </div>
                <img
                    src={theme === "dark" ? dark : light}
                    onClick={toggleTheme}>
                </img>
            </div>
        </div>
    )
}
