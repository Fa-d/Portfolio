import { createContext, useContext, useState, ReactNode } from 'react';

interface LoadingState {
    about: boolean;
    skills: boolean;
    projects: boolean;
    experience: boolean;
    articles: boolean;
    education: boolean;
    footer: boolean;
}

interface GlobalLoadingContextProps {
    loadingState: LoadingState;
    setLoading: (key: keyof LoadingState, value: boolean) => void;
    isAnyLoading: boolean;
}

const defaultState: LoadingState = {
    about: true,
    skills: true,
    projects: true,
    experience: true,
    articles: true,
    education: true,
    footer: true,
};

const GlobalLoadingContext = createContext<GlobalLoadingContextProps | undefined>(undefined);

export const GlobalLoadingProvider = ({ children }: { children: ReactNode }) => {
    const [loadingState, setLoadingState] = useState<LoadingState>(defaultState);

    const setLoading = (key: keyof LoadingState, value: boolean) => {
        setLoadingState(prev => ({ ...prev, [key]: value }));
    };

    const isAnyLoading = Object.values(loadingState).some(Boolean);

    return (
        <GlobalLoadingContext.Provider value={{ loadingState, setLoading, isAnyLoading }}>
            {children}
        </GlobalLoadingContext.Provider>
    );
};

export const useGlobalLoading = () => {
    const context = useContext(GlobalLoadingContext);
    if (!context) throw new Error('useGlobalLoading must be used within GlobalLoadingProvider');
    return context;
};
