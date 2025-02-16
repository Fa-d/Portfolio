
import './About.css';
import Lottie from 'react-lottie-player'
import animationData from '../../assets/person.json'
import { ContactItems } from '../contactItems/ContactItems';
import { FullName, Position, Subtitle, AboutMeDescription, ExportTitle, AboutMeDescription2 } from '../../data/Strings'

export default function About() {


    return (
        <div className="about-root" >
            <div className="about-row">
                <div className='left-item'>

                    <h4 style={{ whiteSpace: 'pre-line' }}>
                        {AboutMeDescription}
                        <h2>
                            {FullName}
                        </h2>
                        <h4>
                            {AboutMeDescription2}
                        </h4>
                    </h4>


                    <h3>{Position}
                        <h2>{Subtitle}</h2>
                    </h3>




                    <div className='connect-box'>
                        <span className='export-title'>{ExportTitle}</span>
                        {ContactItems()}
                    </div>

                </div>
                <div className="right-item">
                    <Lottie
                        loop={true}
                        style={{ width: 400, height: 400 }}
                        animationData={animationData}
                    />
                </div>
            </div>
        </div>
    );


}