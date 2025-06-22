import React, { useState, useEffect } from 'react';
import './Education.css';

// Define the interface locally
export interface EducationProps {
    institution: string;
    date: string;
    degree: string;
}

const Education: React.FC = () => {
    const [steps, setSteps] = useState<EducationProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('/data/education.json');
                if (!response.ok) {
                    throw new Error(`Failed to fetch education data: ${response.statusText}`);
                }
                const data: EducationProps[] = await response.json();
                setSteps(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred while fetching education data');
                setSteps([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading education...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>Error: {error}</p>;
    }

    if (steps.length === 0) {
        return <p>No education data found.</p>;
    }

    return (
        <div className='content-edu'>
            <h3 className="title">EDUCATION</h3>
            <ul className='root-ul'>
                {steps.map(item => (
                    <li key={item.institution} className='item_root-edu'>
                        <div className='degree-title'>{item.degree}</div>
                        <div className='date-edu'>{item.date}</div>
                        <div className='inistitute'>{item.institution}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Education;

