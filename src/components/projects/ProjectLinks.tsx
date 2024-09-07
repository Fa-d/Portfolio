import React from "react";
import "./Projects.css";
import { ProjectLinkProps } from "../../data/ProjectData";
import { openInNewTab } from "../../utils/NewTab";

const ProjectLinks: React.FC<{ items: ProjectLinkProps[] }> = ({ items }) => {
    return (
        <div>
            {
                items.map((item =>
                    <img
                        onClick={() => { openInNewTab(item.url) }}
                        className="img-desc" src={item.logo}
                        alt="item"
                    />
                ))
            }
        </div>
    );
}

export default ProjectLinks;
