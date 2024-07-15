import React, { createContext, useState } from 'react'


export const ThemeContext = createContext("light")

function ThemeContextProvider(props) {
    // eslint-disable-next-line
    const [theme, setTheme] = useState({
        type: 'dark',
        primary: '#545fc4',
        primary400: '#6e76c7',
        primary600: '#3644c9',
        primary80: '#545fc4cc',
        primary50: '#545fc480',
        primary30: '#545fc44d',
        secondary: '#212121',
        secondary70: '#212121b3',
        secondary50: '#21212180',
        tertiary: '#eaeaea',
        tertiary80: '#eaeaeacc',
        tertiary70: '#eaeaeab3',
        tertiary50: '#eaeaea80'
    }
    )
    const [drawerOpen, setDrawerOpen] = useState(false)

    const setHandleDrawer = () => {
        setDrawerOpen(!drawerOpen)
    }

    const value = { theme, drawerOpen, setHandleDrawer }
    return (
        <ThemeContext.Provider value={value}>
            {props.children}
        </ThemeContext.Provider>
    )
}


export default ThemeContextProvider