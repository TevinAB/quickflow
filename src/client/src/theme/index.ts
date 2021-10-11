import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#081a43',
      light: '#3d4080',
      dark: '#00002b',
    },
    secondary: {
      main: '#fafafc',
      dark: '#c7c7c9',
    },
  },
  typography: {
    fontFamily: ['Nunito', 'sans-serif'].join(','),
    fontSize: 12,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 425,
      md: 768,
      lg: 1024,
      xl: 1440,
    },
  },
});
