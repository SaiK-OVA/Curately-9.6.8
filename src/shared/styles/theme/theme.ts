// import { createTheme } from '@mui/material/styles';


// const theme = createTheme({
const customTheme = {
    palette: {
        primary: {
            main: 'var(--c-primary-color)',
        },
        secondary: {
            main: 'var(--c-secondary-color)',
        },
    },
    typography: {
        fontFamily: [
            "system-ui",
            '-apple-system',
            'Segoe UI',
            'Roboto',
            'Ubuntu',
            'Cantarell',
            'Noto Sans',
            'sans-serif',
            '"Segoe UI"',
            'Roboto',
            'Helvetica',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
        ].join(','),
    },
};

export default customTheme;