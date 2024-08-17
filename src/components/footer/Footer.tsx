import React from 'react';
import './Footer.css';
import arrow from '../../assets/up-arrow.png'

import { useState, useEffect } from 'react';

const Footer: React.FC = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);

    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        <div className='main-cont'>
            <div className="container">
                <div className="navigation">
                    <h4>NAVIGATION</h4>
                    <div className="line"></div>
                    <ul>
                        <li>ABOUT</li>
                        <li>EDUCATION</li>
                        <li>EXPERIENCE</li>
                        <li>PROJECTS</li>
                        <li>BLOGS</li>
                        <li>CONTACT</li>
                    </ul>
                </div>
                <div className="socials">
                    <h4>SOCIALS</h4>
                    <div className="line"></div>
                    <ul>
                        <li>LINKEDIN</li>
                        <li>GITHUB</li>
                        <li>YOUTUBE</li>
                        <li>INSTAGRAM</li>
                        <li>FACEBOOK</li>
                        <li>X</li>
                    </ul>
                </div>
                <div className="resources">
                    <h4>RESOURCES</h4>
                    <div className="line"></div>
                    <ul>
                        <li>MEDIUM</li>
                        <li>CONTESTS</li>
                        <li>NEWSLETTER</li>
                    </ul>
                </div>
            </div>
            <div className="footer">
                <div className="copyright">
                    <p>© 2024</p>
                    <h1>MD. SADAKT HUSSAIN FAHAD</h1>
                </div>
                <div className="local-time">
                    <h3>LOCAL TIME</h3>
                    <p>{time.toLocaleTimeString()}</p>
                </div>
                <div className="go-top">
                    <img src={arrow} onClick={scrollToTop} />
                </div>
            </div>
        </div>



    );
};

export default Footer;
