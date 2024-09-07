import React from 'react';
import './Footer.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import arrow from '../../assets/up-arrow.png'

import { ContactItems } from '../contactItems/ContactItems';


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
        <div className="container">
            <div >
                <h3>Contact</h3>
                {ContactItems()}
                <div className="copyright">
                    <p>© 2024</p>
                    <h1>MD. SADAKT HUSSAIN FAHAD</h1>
                </div>

            </div>
            <div className='right-cont'>
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
                <div className="foot-last">

                    <div className="local-time">
                        <h3>LOCAL TIME</h3>
                        <p>{time.toLocaleTimeString()}</p>
                    </div>
                    <div className="go-top">
                        <img src={arrow} onClick={scrollToTop} />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Footer;
