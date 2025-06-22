import React, { useState, useEffect } from 'react';
import './Footer.css';
import { useNavigate } from 'react-router-dom';
import { ContactItems } from '../contactItems/ContactItems';

const arrowImgPath = '/assets/up-arrow.png';

interface SiteStrings {
    FullName?: string;
    // Add other string properties if needed by Footer in future
}

const Footer: React.FC = () => {
    const [time, setTime] = useState(new Date());
    const [siteStrings, setSiteStrings] = useState<SiteStrings>({});
    const [loadingStrings, setLoadingStrings] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        // Fetch site strings
        const fetchStrings = async () => {
            try {
                const response = await fetch('/data/strings.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch site strings');
                }
                const data: SiteStrings = await response.json();
                setSiteStrings(data);
            } catch (error) {
                console.error("Error fetching site strings for Footer:", error);
                // Set default or handle error appropriately
                setSiteStrings({ FullName: "MD. SADAKAT HUSSAIN FAHAD" }); // Fallback
            } finally {
                setLoadingStrings(false);
            }
        };

        fetchStrings();
        return () => clearInterval(intervalId);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    // Display a loading state or default content until strings are loaded
    const displayName = loadingStrings ? "Loading..." : (siteStrings.FullName || "MD. SADAKAT HUSSAIN FAHAD");

    return (
        <div className="container">
            <div className='left-cont'>
                <h3>Contact</h3>
                {ContactItems()}
                <div className="copyright">
                    <p>© {new Date().getFullYear()}</p> {/* Dynamic year */}
                    <h1>{displayName}</h1>
                </div>
            </div>
            <div className='right-cont'>
                <div className="navigation">
                    <h4>NAVIGATION</h4>
                    <div className="line"></div>
                    <ul>
                        <li>
                            <div onClick={() => { scrollToTop() }} className='hyperlink-item'>ABOUT</div>
                        </li>
                        <li>
                            <div onClick={() => { navigate('/projects') }} className='hyperlink-item'>PROJECTS</div>
                        </li>
                        <li>
                            <div onClick={() => { navigate('/skills') }} className='hyperlink-item'>SKILLS</div>
                        </li>
                        <li>
                            <div onClick={() => { navigate('/articles') }} className='hyperlink-item'>ARTICLES</div>
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
                        <img src={arrowImgPath} onClick={scrollToTop} alt="Go to top" />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Footer;
