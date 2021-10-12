import { createTheme } from '@mui/material/styles';
import { CSSProperties } from 'react';

declare module '@mui/material/styles' {
  interface Theme {
    widgets: {
      borderSize: CSSProperties['borderWidth'];
      borderRadius: CSSProperties['borderRadius'];
      borderColor: CSSProperties['borderColor'];
    };
  }

  interface ThemeOptions {
    widgets?: {
      borderSize?: CSSProperties['borderWidth'];
      borderRadius?: CSSProperties['borderRadius'];
      borderColor?: CSSProperties['borderColor'];
    };
  }

  interface Palette {}
  interface PaletteOptions {}

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
  widgets: {
    borderSize: '1px',
    borderRadius: '10px',
    borderColor: 'rgba(153, 153, 153, 0.44)',
  },
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
    fontSize: 13,
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
