import "./Skills.css"

export default function TSkill() {

    return (
        <>
            <div className="graph-container">
                <div className="axis-x">
                    <span>Breadth of Knowledge</span>
                </div>
                <div className="axis-y">
                    <span>Depth of Knowledge</span>
                </div>
                <div className="t-shape">
                    <div className="vertical-line"></div>
                    <div className="horizontal-line"></div>
                </div>
            </div>
        </>
    )
}  