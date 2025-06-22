
import React, { useState, useEffect } from 'react';
import './About.css';
import Lottie from 'react-lottie-player';
// animationData will be fetched or path adjusted if Lottie can take a URL
import { ContactItems } from '../contactItems/ContactItems';

// Define an interface for the strings data
interface SiteStrings {
    FullName?: string;
    Position?: string;
    Subtitle?: string;
    AboutMeDescription?: string;
    AboutMeDescription2?: string;
    ExportTitle?: string;
}

export default function About() {
    const [strings, setStrings] = useState<SiteStrings>({});
    const [animationData, setAnimationData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch strings data
                const stringsResponse = await fetch('/data/strings.json');
                if (!stringsResponse.ok) {
                    throw new Error(`Failed to fetch strings: ${stringsResponse.statusText}`);
                }
                const stringsData: SiteStrings = await stringsResponse.json();
                setStrings(stringsData);

                // Fetch Lottie animation data
                // Lottie component might be able to take a URL directly.
                // If so, we just need the path: const animationPath = '/assets/person.json';
                // If it needs the JSON object, we fetch it:
                const animationResponse = await fetch('/assets/person.json');
                if (!animationResponse.ok) {
                    throw new Error(`Failed to fetch animation data: ${animationResponse.statusText}`);
                }
                const animationJson = await animationResponse.json();
                setAnimationData(animationJson);

            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading about section...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>Error: {error}</p>;
    }

    return (
        <div className="about-root">
            <div className="about-row">
                <div className='left-item'>
                    <h4 style={{ whiteSpace: 'pre-line' }}>
                        {strings.AboutMeDescription || ''}
                        <h2>
                            {strings.FullName || 'Your Name'}
                        </h2>
                        <h4>
                            {strings.AboutMeDescription2 || ''}
                        </h4>
                    </h4>
                    <h3>{strings.Position || 'Your Position'}
                        <h2>{strings.Subtitle || 'Your Subtitle'}</h2>
                    </h3>
                    <div className='connect-box'>
                        <span className='export-title'>{strings.ExportTitle || 'Connect'}</span>
                        {ContactItems()}
                    </div>
                </div>
                <div className="right-item">
                    {animationData && (
                        <Lottie
                            loop={true}
                            style={{ width: 400, height: 400 }}
                            animationData={animationData}
                            play // Ensure animation plays
                        />
                    )}
                </div>
            </div>
        </div>
    );
}