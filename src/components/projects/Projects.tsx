import React, { useState, useEffect } from 'react';
import ProjectLanguages from "./ProjectLanguages";
import ProjectLinks from "./ProjectLinks";
import './Projects.css';

// Define interfaces locally or move to a shared types file
export interface ProjectLanguageProps {
    logo: string; // Path to image, e.g., /assets/kotlin.png
    url: string;  // This was empty in original data, but keeping for structure
}

export interface ProjectLinkProps {
    logo: string; // Path to image, e.g., /assets/github.png
    url: string;  // URL to the project or live site
}

export interface ProjectProps {
    name: string;
    desc: string;
    languages: ProjectLanguageProps[];
    references: ProjectLinkProps[];
}


const Projects: React.FC = () => {
    const [items, setItems] = useState<ProjectProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('/data/projects.json');
                if (!response.ok) {
                    throw new Error(`Failed to fetch projects data: ${response.statusText}`);
                }
                const data: ProjectProps[] = await response.json();
                setItems(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred while fetching projects');
                setItems([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    if (loading) {
        return <p>Loading projects...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>Error: {error}</p>;
    }

    if (items.length === 0) {
        return <p>No projects found.</p>;
    }

    return (
        <div className="title-root">
            <h3 className="title">PROJECTS</h3>
            <div className="project-root">
                {items.map((item, index) => (
                    <div className='item-root' key={item.name || index}>
                        <div className="repo-name-div">
                            <h4 className="repo-name">
                                {item.name}
                            </h4>
                        </div>
                        <p className="repo-description">
                            {item.desc}
                        </p>
                        <div className="flexDiv">
                            <div className="repo-details Leftitem">
                                <ProjectLanguages items={item.languages} />
                            </div>
                            <div className="repo-details Rightitem">
                                <ProjectLinks items={item.references} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;

