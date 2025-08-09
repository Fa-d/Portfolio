import React, { createContext, useContext, useState, useLayoutEffect, ReactNode } from "react";
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';

// Extend MUI Palette to include custom colors
declare module '@mui/material/styles' {
    interface Palette {
        custom: {
            button: string;
            footer: string;
        };
    }
    interface PaletteOptions {
        custom?: {
            button: string;
            footer: string;
        };
    }
}

interface ThemeContextType {
    theme: string;
    toggleTheme: () => void;
    muiTheme: Theme;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    toggleTheme: () => { },
    muiTheme: createTheme({ palette: { mode: 'light' } }),
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

const getMuiTheme = (mode: string) => createTheme({
    palette: {
        mode: mode === 'dark' ? 'dark' : 'light',
        background: {
            default: mode === 'dark' ? '#181a1b' : '#eef2f8',
            paper: mode === 'dark' ? '#23272b' : '#ffffff', // slightly different from default
        },
        // Central custom colors
        custom: {
            button: mode === 'dark' ? '#1976d2' : '#1976d2', // Example, change as needed
            footer: mode === 'dark' ? '#23272b' : '#222831', // Example, change as needed
        } as any,
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    border: '0px solid',
                    borderColor: 'divider',
                    backgroundImage: 'none',
                },
            },
        },
    },
});

export const ThemeContextProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const initialTheme = () => localStorage.getItem("PORT_THEME") || "light";

    const [theme, setTheme] = useState<string>(initialTheme);
    const muiTheme = getMuiTheme(theme);

    const toggleTheme = () =>
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));

    useLayoutEffect(() => {
        localStorage.setItem("PORT_THEME", theme);

        if (theme === "light") {
            document.documentElement.classList.remove("dark");
            document.documentElement.classList.add("light");
        } else {
            document.documentElement.classList.remove("light");
            document.documentElement.classList.add("dark");
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, muiTheme }}>
            <ThemeProvider theme={muiTheme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};


export default { ThemeContextProvider };

