import React, { useContext } from 'react';

import './About.css';
import Lottie from 'react-lottie';
import animationData from '../../assets/person.json'

export default function About() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div className="about-body">
            <div className="about-description">
                <h2 style={{ color: '#3644c9' }}>I'm Sadakat Hussain Fahad</h2>
                <p style={{ color: '#545fc4cc' }}>Desc 1<br /><br />Desc 2</p>
            </div>
            <div className="about-img">
                <Lottie
                    options={defaultOptions}
                />
            </div>

        </div>
    );
}