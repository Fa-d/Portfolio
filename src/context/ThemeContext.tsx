import { createContext } from 'react'

var blueTheme = {
    type: 'dark',
    primary: '#DC5F00',
    primary400: '#6e76c7',
    primary600: '#3644c9',
    primary80: '#545fc4cc',
    primary50: '#545fc480',
    primary30: '#545fc44d',
    secondary: '#373A40',
    secondary70: '#212121b3',
    secondary50: '#21212180',
    tertiary: '#686D76',
    tertiary80: '#eaeaeacc',
    tertiary70: '#eaeaeab3',
    tertiary50: '#eaeaea80',
    extraLight:'#EEEEEE'
}
const ThemeContext = createContext(blueTheme)
export default ThemeContext