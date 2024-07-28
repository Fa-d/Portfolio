import "./Header.css"

export default function Header() {
    return (
        <div className="header">
            <div className="img">
                <img src={"src/assets/logo.png"} />
            </div>
            <div className="right-box">
                <div onClick={() => { }} className="right-box-item"><b>Projects</b></div>
                <div onClick={() => { }} className="right-box-item"><b>Contact</b></div>
                <div onClick={() => { }} className="right-box-item"><b>Blogs</b></div>
                <div onClick={() => { }} className="r-corner-card">
                   Resume
                </div>
            </div>
        </div>
    )
}
