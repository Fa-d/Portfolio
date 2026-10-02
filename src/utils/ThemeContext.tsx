import React, { createContext, useContext, useState, useLayoutEffect, useEffect, useMemo, ReactNode } from "react";
import { ThemeProvider, createTheme, Theme, Shadows } from '@mui/material/styles';

// Extend MUI Palette to include custom colors
declare module '@mui/material/styles' {
    interface Palette {
        custom: {
            button: string;
            footer: string;
            gradient: string;
            gradientSoft: string;
        };
    }
    interface PaletteOptions {
        custom?: {
            button: string;
            footer: string;
            gradient: string;
            gradientSoft: string;
        };
    }
}

type ThemeMode = "light" | "dark";

interface ThemeContextType {
    theme: ThemeMode;
    toggleTheme: () => void;
    muiTheme: Theme;
}

const STORAGE_KEY = "PORT_THEME";

export const BRAND = {
    primary: '#667eea',
    secondary: '#764ba2',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
};

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

// Soft, low-contrast shadows instead of MUI's default heavy ones.
const buildShadows = (mode: ThemeMode): Shadows => {
    const base = mode === 'dark' ? '0, 0, 0' : '15, 23, 42';
    const shadows = Array.from({ length: 25 }, (_, i) => {
        if (i === 0) return 'none';
        const y = Math.round(i * 0.75);
        const blur = Math.round(i * 2.5);
        const alpha = mode === 'dark' ? 0.3 + i * 0.01 : 0.04 + i * 0.004;
        return `0 ${y}px ${blur}px rgba(${base}, ${alpha.toFixed(3)})`;
    });
    return shadows as Shadows;
};

const getMuiTheme = (mode: ThemeMode) => createTheme({
    palette: {
        mode,
        primary: {
            main: BRAND.primary,
            contrastText: '#ffffff',
        },
        secondary: {
            main: BRAND.secondary,
            contrastText: '#ffffff',
        },
        background: {
            default: mode === 'dark' ? '#181a1b' : '#eef2f8',
            paper: mode === 'dark' ? '#23272b' : '#ffffff',
        },
        custom: {
            button: BRAND.primary,
            footer: mode === 'dark' ? '#121416' : '#222831',
            gradient: BRAND.gradient,
            gradientSoft: mode === 'dark'
                ? 'linear-gradient(135deg, rgba(102,126,234,0.16) 0%, rgba(118,75,162,0.16) 100%)'
                : 'linear-gradient(135deg, rgba(102,126,234,0.10) 0%, rgba(118,75,162,0.10) 100%)',
        },
    },
    typography: {
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        h1: { fontWeight: 800, letterSpacing: '-0.02em' },
        h2: { fontWeight: 700, letterSpacing: '-0.01em' },
        h3: { fontWeight: 700 },
        h4: { fontWeight: 700 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
        button: { textTransform: 'none', fontWeight: 600 },
    },
    shape: {
        borderRadius: 10,
    },
    shadows: buildShadows(mode),
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
    },
});

const getSystemMode = (): ThemeMode =>
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const getSavedMode = (): ThemeMode | null => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved === 'dark' || saved === 'light' ? saved : null;
    } catch {
        return null;
    }
};

export const ThemeContextProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<ThemeMode>(() => getSavedMode() ?? getSystemMode());
    const muiTheme = useMemo(() => getMuiTheme(theme), [theme]);

    // Follow OS theme changes until the visitor picks a theme explicitly.
    useEffect(() => {
        const media = window.matchMedia?.('(prefers-color-scheme: dark)');
        if (!media) return;
        const onChange = (e: MediaQueryListEvent) => {
            if (!getSavedMode()) setTheme(e.matches ? 'dark' : 'light');
        };
        media.addEventListener('change', onChange);
        return () => media.removeEventListener('change', onChange);
    }, []);

    const toggleTheme = () =>
        setTheme((prevTheme) => {
            const next = prevTheme === "light" ? "dark" : "light";
            try {
                localStorage.setItem(STORAGE_KEY, next);
            } catch {
                // ignore storage failures (private mode etc.)
            }
            return next;
        });

    useLayoutEffect(() => {
        const root = document.documentElement;
        root.classList.remove(theme === "light" ? "dark" : "light");
        root.classList.add(theme);
        root.style.colorScheme = theme;
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
