
import './About.css';
import Lottie from 'react-lottie-player'
import animationData from '../../assets/person.json'
import { ContactItems } from '../contactItems/ContactItems';

export default function About() {


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

                    <div className='connect-btn'>
                        <h4>Connect with me on:</h4>
                        {ContactItems()}
                    </div>

                </div>
                <div className="about-img">
                    <Lottie
                        style={{ width: 500, height: 500 }}
                        animationData={animationData}
                    />
                </div>
            </div>
        </div>
    );
}