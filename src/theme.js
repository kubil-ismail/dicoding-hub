import { createTheme } from '@mui/material/styles';

const mainTheme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h1: {
      fontSize: '48px',
      fontWeight: '600',
      color: '#444444',
    },
    h2: {
      fontSize: '36px',
      fontWeight: '600',
      color: '#444444',
    },
    h3: {
      fontSize: '30px',
      fontWeight: '600',
      color: '#444444',
    },
    h4: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#444444',
    },
    h5: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#444444',
    },
    h6: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#444444',
    },
    body1: {
      fontSize: '16px',
      color: '#444444',
    },
    body2: {
      fontSize: '12px',
      color: '#7D7E81',
    },
    button: {
      textTransform: 'inherit',
    },
  },
  palette: {
    primary: {
      main: '#0076d6',
      contrastText: '#fff',
    },
    info: {
      main: '#009ec1',
      contrastText: '#fff',
    },
    secondary: {
      main: '#090B04',
      contrastText: '#fff',
    },
    error: {
      main: '#e52207',
      contrastText: '#fff',
    },
    warning: {
      main: '#ffbe2e',
      contrastText: '#171717',
    },
    success: {
      main: '#04c585',
      contrastText: '#fff',
    },
    text: {
      primary: '#444444',
      secondary: '#adadad',
      disabled: '#ffffff',
    },
  },
  // Overrides style component
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        size: 'small',
      },
      styleOverrides: {
        outlinedPrimary: {
          fontSize: '11px',
        },
      },
    },
  },
});

export default mainTheme;
