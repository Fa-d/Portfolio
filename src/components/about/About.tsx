
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
                    <h1>Hi I'm Sadakat Hussain Fahad</h1>
                    <div className="content-text">
                        <h2>Software Engineer</h2>
                        <h4>Building Mobile Applications.</h4>
                        {/* <p>
                            A Frontend Developer and Visual Designer with experience in web
                            design, brand identity and product design.
                        </p> */}
                    </div>
                    <a href="https://github.com/Fa-d" className="btn-secondary" target="_blank">Connect With Me</a>
                </div>
                <div className="about-img">
                    <Lottie options={defaultOptions} />
                </div>
            </div>
            <div className="line-styling">
                <div className="style-circle" ></div>
                <div className="style-circle" ></div>
                <div className="style-line" ></div>
            </div>

        </div>
    );
}