
import './Experience.css'
import idImg from '../../assets/identification-card.png';
import calender from '../../assets/calender.png';
import jobLoc from '../../assets/job_loc.png';

import React from 'react';

interface ExperienceProps {
    date: string;
    role: string;
    company: string;
    description: string;
    skills: string[];
    links?: string[];
}

const CareerSteps: React.FC<{ steps: ExperienceProps[] }> = ({ steps }) => {
    var listItems = steps.map(item =>
        <li className='item_root'>
            <div className='item_invidual'>
                <div className='date_current_job_title'>
                    <img className='image-container' src={idImg} />
                    <div className="current_job_title">{item.role}</div>
                    <img className='image-container' style={{ marginLeft: '50px' }} src={calender} />
                    <div className="date">{item.date}</div>
                </div>
                <div className='date_current_job_title' style={{marginTop: '30px'}}>
                    <img className='image-container' src={jobLoc} />
                    <div className="company">{item.company}</div>
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
            <div className='3'>
                <ul >
                    {listItems}
                </ul>
            </div>
        </div>

    );
};
export default CareerSteps;

