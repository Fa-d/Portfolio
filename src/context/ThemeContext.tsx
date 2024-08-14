import React, { createContext, useContext, useState, useLayoutEffect, ReactNode } from "react";

interface ThemeContextType {
    theme: string;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    toggleTheme: () => { },
});

export const useTheme = () => {
    const context = useContext(ThemeContext);
    
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};


interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const initialTheme = () => localStorage.getItem("PORT_THEME") || "light";

    const [theme, setTheme] = useState<string>(initialTheme);

    const toggleTheme = () =>
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));

    useLayoutEffect(() => {
        localStorage.setItem("PORT_THEME", theme);

        if (theme === "light") {
            document.documentElement.classList.remove("dark-mode");
            document.documentElement.classList.add("light-mode");
        } else {
            document.documentElement.classList.remove("light-mode");
            document.documentElement.classList.add("dark-mode");
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};


export default { ThemeContextProvider };

