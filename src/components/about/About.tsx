
import './About.css';
import Lottie from 'react-lottie';
import animationData from '../../assets/person.json'

export default function About() {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div className="about" >
            <div className="about-body">
                <div className='about-description'>
                    <div className='name-desc'>
                        <h1>MD. SADAKAT HUSSAIN FAHAD</h1>
                        <h3>A Software Engineer</h3>
                    </div>
                    <h3>Building Mobile Applications.</h3>
                    <p>
                        An android developer interested in all types of development. Has a kneen interest on open-source contribution. Likes to be updated on the latest technologies.
                    </p>

                    <a href="mailto:contact@sadakat.dev" style={{ textDecoration: 'none' }} target="_blank">
                        <div className='connect-btn'>Contact Me</div>
                    </a>
                </div>
                <div className="about-img">
                    <Lottie options={defaultOptions} />
                </div>
            </div>
        </div>
    );
}