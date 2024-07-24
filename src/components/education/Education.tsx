
import { useContext } from 'react';
import ThemeContext from '../../context/ThemeContext';
import './Education.css'


export default function Education() {
    const theme = useContext(ThemeContext);

    return (<div className="education">
        <div className="line-styling">
            <div className="style-circle" style={{ backgroundColor: theme.primary }}></div>
            <div className="style-circle" style={{ backgroundColor: theme.primary }}></div>
            <div className="style-line" style={{ backgroundColor: theme.primary }}></div>
        </div>
    </div>);
}

