import React from "react";
import "./Projects.css";
import { ProjectLinkProps } from "../../data/ProjectData";

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
export const openInNewTab = (url: string): void => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) {
        newWindow.focus();
    }
};
export default ProjectLinks;
