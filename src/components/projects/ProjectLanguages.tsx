import React from "react";
import "./Projects.css";
import { ProjectLanguageProps } from "../../data/ProjectData";

const ProjectLanguages: React.FC<{ items: ProjectLanguageProps[] }> = ({ items }) => {
    return (
        <div>
            {
                items.map((item =>
                    <img
                        className="img-desc" src={item.logo}
                        alt="item"
                    />
                ))
            }
        </div>
    );
}

export default ProjectLanguages;
