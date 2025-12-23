import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'KelloggsSans, Arial, sans-serif',
    h1: {
      fontWeight: 700
    },
    button: {
      fontWeight: 700,
      textTransform: 'none'
    }
  }
});

export default theme;
