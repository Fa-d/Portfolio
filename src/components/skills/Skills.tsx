import React, { useState, useEffect } from 'react';
import "./Skills.css";

// Define the interface locally
export interface SkillsProps {
    title: string;
    image: string; // Path to image, e.g., /assets/kotlin.png
}

const Skills: React.FC = () => {
    const [items, setItems] = useState<SkillsProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('/data/skills.json');
                if (!response.ok) {
                    throw new Error(`Failed to fetch skills data: ${response.statusText}`);
                }
                const data: SkillsProps[] = await response.json();
                setItems(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred while fetching skills');
                setItems([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading skills...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>Error: {error}</p>;
    }

    if (items.length === 0) {
        return <p>No skills found.</p>;
    }

    return (
        <div className="skils-root">
            <h3 className="title">Works with</h3>
            <div className="skill-root">
                {items.map((item, index) => (
                    <div className="skill-item-container" key={item.title || index}>
                        <img
                            style={{ height: 30, width: 30, marginInlineEnd: 20 }}
                            src={item.image}
                            alt={item.title} // Added alt text
                        />
                        {item.title}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Skills;