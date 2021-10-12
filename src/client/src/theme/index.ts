import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }

  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile_sm: true;
    mobile: true;
    tablet: true;
    laptop: true;
    desktop: true;
  }
}

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
      mobile_sm: 0,
      mobile: 425,
      tablet: 768,
      laptop: 1024,
      desktop: 1440,
    },
  },
});
