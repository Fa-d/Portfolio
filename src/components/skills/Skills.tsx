import { SkillsProps } from "../../data/SkillsData";
import "./Skills.css"


const Skills: React.FC<{ items: SkillsProps[] }> = ({ items }) => {
    return (
        <div className="skils-root">
            <h3 className="title">My Professional Skills</h3>
            <div className="skill-root">
                {
                    items.map((item =>
                        <div className="skill-item-container">

                            <img style={{ height: 30, width: 30, marginInlineEnd: 20 }} src={item.image} />

                            {item.title}

                        </div>
                    ))
                }
            </div>

        </div>
    );
};

export default Skills;