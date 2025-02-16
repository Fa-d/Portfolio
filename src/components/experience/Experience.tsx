
import './Experience.css'
import idImg from '../../assets/identification-card.png';
import calender from '../../assets/calender.png';
import jobLoc from '../../assets/job_loc.png';
//import newTab from '../../assets/new-tab.png';

import React from 'react';
//import { useNavigate } from 'react-router-dom';

interface ExperienceProps {
    date: string;
    role: string;
    company: string;
    description: string;
    skills: string[];
    links?: string[];
}

const CareerSteps: React.FC<{ steps: ExperienceProps[] }> = ({ steps }) => {
    //const navigate = useNavigate();
    var listItems = steps.map((item, index) =>
        <li key={item.company || index} className='item_root' >
            <div className='item_invidual'>
                <div className='title-with-link'>
                    <div className='date_current_job_title' key={item.company}>
                        <img className='image-container' src={idImg} />
                        <div className="current_job_title">{item.role}</div>
                    </div>
                    {/* <img className='job-link' src={newTab} onClick={() => { navigate('/') }} /> */}
                </div>


                <div className='date_current_job_title' style={{ marginTop: '30px' }}>
                    <img className='image-container' src={jobLoc} />
                    <div className="company">{item.company}</div>

                    <img className='image-container' style={{ marginLeft: '50px' }} src={calender} />
                    <div className="date">{item.date}</div>
                </div>

                {/* <div className="description">{item.description}</div> */}
                <div className="skills">
                    {item.skills.map((skill, index) => (
                        <button key={index} className="skill-item">
                            {skill}
                        </button>
                    ))}
                </div>

            </div>
        </li>
    )

    return (
        <div className='content'>
            <h3 className="title">EXPERIENCE</h3>
            <ul >
                {listItems}
            </ul>
        </div>

    );
};
export default CareerSteps;

