
import './About.css';
import Lottie from 'react-lottie';
import animationData from '../../assets/person.json'
import { useContext } from 'react';
import ThemeContext from '../../context/ThemeContext';

export default function About() {
    const theme = useContext(ThemeContext);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div className="about" id="about" style={{ backgroundColor: theme.secondary }}>
            <div className="line-styling">
                <div className="style-circle" style={{ backgroundColor: theme.primary }}></div>
                <div className="style-circle" style={{ backgroundColor: theme.primary }}></div>
                <div className="style-line" style={{ backgroundColor: theme.primary }}></div>
            </div>
            <div className="about-body">
                <div className='about-description'>
                    <p style={{ color: theme.tertiary80 }}>HI !! I'm</p>
                    <div className='about-name-title'>
                        <h2 style={{ color: theme.primary }}>Sadakat Hussain Fahad</h2>
                        <h4 style={{ color: theme.tertiary80}}>Softaware Engineer</h4>

                    </div>
                    <p> Results-driven Software Engineer seeking to collaborative opportunities with proactive teams to tackle complex problems and thrive on challenges. Strives to contribute to a structured and growth-oriented environment, making valuable contri- butions while advancing professional development. Committed to continuous improvement and leveraging capabilities to drive success.</p>
                </div>
                <div className="about-img">
                    <Lottie options={defaultOptions} />
                </div>
            </div>


        </div>
    );
}