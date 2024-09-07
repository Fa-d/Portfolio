import { ProjectProps } from "../../data/ProjectData";
import ProjectLanguages from "./ProjectLanguages";
import ProjectLinks from "./ProjectLinks";
import './Projects.css'

const Projects: React.FC<{ items: ProjectProps[] }> = ({ items }) => {
    return (
        <div className="title-root">
            <h3 className="title">PROJECTS</h3>
            <div className="project-root">
                {
                    items.map((item =>
                        <div className='item-root'>
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
                    ))
                }
            </div>
        </div>
    );
};
export default Projects;

