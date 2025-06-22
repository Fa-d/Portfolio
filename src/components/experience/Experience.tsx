import React, { useState, useEffect } from 'react';
import './Experience.css';

// Image paths are now direct URLs to public/assets
const idImgPath = '/assets/identification-card.png';
const calenderPath = '/assets/calender.png';
const jobLocPath = '/assets/job_loc.png';

// Define the interface locally
interface ExperienceProps {
    date: string;
    role: string;
    company: string;
    description: string; // This was commented out in the original JSX, but exists in data
    skills: string[];
    links?: string[];
}

const CareerSteps: React.FC = () => {
    const [steps, setSteps] = useState<ExperienceProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('/data/career.json');
                if (!response.ok) {
                    throw new Error(`Failed to fetch career data: ${response.statusText}`);
                }
                const data: ExperienceProps[] = await response.json();
                setSteps(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred while fetching career data');
                setSteps([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading experience...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>Error: {error}</p>;
    }

    if (steps.length === 0) {
        return <p>No experience data found.</p>;
    }

    return (
        <div className='content'>
            <h3 className="title">EXPERIENCE</h3>
            <ul>
                {steps.map((item, index) => (
                    <li key={item.company || index} className='item_root'>
                        <div className='item_invidual'>
                            <div className='title-with-link'>
                                <div className='date_current_job_title' key={item.company}>
                                    <img className='image-container' src={idImgPath} alt="Role icon" />
                                    <div className="current_job_title">{item.role}</div>
                                </div>
                                {/* Links can be added here if item.links exists */}
                            </div>

                            <div className='date_current_job_title' style={{ marginTop: '30px' }}>
                                <img className='image-container' src={jobLocPath} alt="Company location icon" />
                                <div className="company">{item.company}</div>

                                <img className='image-container' style={{ marginLeft: '50px' }} src={calenderPath} alt="Date icon" />
                                <div className="date">{item.date}</div>
                            </div>

                            {/* Description can be uncommented if desired */}
                            {/* <div className="description" style={{ marginTop: '10px' }}>{item.description}</div> */}

                            <div className="skills">
                                {item.skills.map((skill, skillIndex) => (
                                    <button key={skillIndex} className="skill-item">
                                        {skill}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CareerSteps;

