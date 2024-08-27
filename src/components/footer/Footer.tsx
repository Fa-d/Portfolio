import React from 'react';
import './Footer.css';
import arrow from '../../assets/up-arrow.png'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Footer: React.FC = () => {
    const [time, setTime] = useState(new Date());
    const navigate = useNavigate();

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
                        <li>
                            <div onClick={() => { navigate('/') }} className='hyperlink-item'>ABOUT</div>
                        </li>
                        <li>
                            <div onClick={() => { navigate('/') }} className='hyperlink-item'>PROJECTS</div>
                        </li>
                        <li>
                            <div onClick={() => { navigate('/skills') }} className='hyperlink-item'>SKILLS</div>
                        </li>
                        <div onClick={() => { navigate('/') }} className='hyperlink-item'>BLOGS</div>
                        <li>
                            <div onClick={() => { navigate('/') }} className='hyperlink-item'>SKILLS</div>
                        </li>
                    </ul>
                </div>
                <div className="socials">
                    <h4>SOCIALS</h4>
                    <div className="line"></div>
                    <ul>
                        <li>
                            <a style={{ textDecoration: 'none' }}
                                href='https://www.linkedin.com/in/sadakat-hussain-fahad/' target="_blank">
                                <div className='hyperlink-item'>LINKEDIN</div>
                            </a>
                        </li>
                        <li>
                            <a style={{ textDecoration: 'none' }}
                                href='https://github.com/Fa-d' target="_blank">
                                <div className='hyperlink-item'>GITHUB</div>
                            </a>
                        </li>
                        <li>
                            <a style={{ textDecoration: 'none' }}
                                href='https://wa.me/8801749948098' target="_blank">
                                <div className='hyperlink-item'>WHATSAPP</div>
                            </a>
                        </li>
                        <li>
                            <a style={{ textDecoration: 'none' }}
                                href='https://www.facebook.com/sadakat.hussain.fahad/' target="_blank">
                                <div className='hyperlink-item'>FACEBOOK</div>
                            </a>
                        </li>
                        <li>
                            <a style={{ textDecoration: 'none' }}
                                href='https://x.com/faddy_fahad__' target="_blank">
                                <div className='hyperlink-item'>X</div>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="resources">
                    <h4>RESOURCES</h4>
                    <div className="line"></div>
                    <ul>
                        <li>
                            <a style={{ textDecoration: 'none' }}
                                href='https://medium.com/@fsadakathussain' target="_blank">
                                <div className='hyperlink-item'>MEDIUM</div>
                            </a>
                        </li>
                        <li>
                            <a style={{ textDecoration: 'none' }}
                                href='https://codeforces.com/profile/faddy_fahad' target="_blank">
                                <div className='hyperlink-item'>CONTESTS</div>
                            </a>
                        </li>

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
