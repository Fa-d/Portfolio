import React, { useState, useEffect } from 'react';
import './ArticleNote.css';
import { openInNewTab } from '../../utils/NewTab';

// Define the interface locally or import from a shared types file later
export interface ArticlesNoteProps {
    title: string;
    date: string;
    url: string;
}

const ArticleNote: React.FC<{ isArticle: boolean }> = ({ isArticle }) => {
    const [items, setItems] = useState<ArticlesNoteProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            const dataType = isArticle ? 'articles' : 'notes';
            try {
                const response = await fetch(`/data/${dataType}.json`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch ${dataType} data: ${response.statusText}`);
                }
                const data: ArticlesNoteProps[] = await response.json();
                setItems(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : `An unknown error occurred while fetching ${dataType}`);
                setItems([]); // Clear items on error or set to default
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [isArticle]);

    if (loading) {
        return <p>Loading {isArticle ? 'articles' : 'notes'}...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>Error: {error}</p>;
    }

    if (items.length === 0) {
        return <p>No {isArticle ? 'articles' : 'notes'} found.</p>;
    }

    return (
        <div className="title-root">
            <h3 className="title">{isArticle ? "ARTICLES" : "NOTES"}</h3>
            {items.map((item, index) => ( // Added index for key if titles/urls aren't unique
                <div
                    key={item.url || index} // Use URL as key, fallback to index
                    className="item-indiv"
                    onClick={() => {
                        if (isArticle && item.url) {
                            openInNewTab(item.url);
                        }
                    }}
                    style={{ cursor: (isArticle && item.url) ? 'pointer' : 'default' }}
                >
                    <h4>{item.title}</h4>
                    <h4>{item.date}</h4>
                </div>
            ))}
            <div className="line"></div>
        </div>
    );
};

export default ArticleNote;