
import './Experience.css'

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
                <div className='date_role'>
                    <div className="role">{item.role}</div>
                    <div className="date">{item.date}</div>
                </div>
                <div className="company">{item.company}</div>
                <div className="description">{item.description}</div>
                <div className="skills">
                    {item.skills.map((skill, index) => (
                        <button  key={index} className="fourth">
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

