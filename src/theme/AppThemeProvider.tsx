import React, { useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useThemeContext, CustomThemeProvider } from '../context/ThemeContext';

interface MuiThemeWrapperProps {
  children: React.ReactNode;
}

const MuiThemeWrapper: React.FC<MuiThemeWrapperProps> = ({ children }) => {
  const { mode } = useThemeContext();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          // We map MUI background default/paper to CSS variables from index.css for deep integration
          // Or we can just let MUI default background handles things.
          // Since we want standard dark/light mode that responds to the UI, let's configure basic palettes.
          ...(mode === 'light'
            ? {
                primary: {
                  main: '#3F72AF',
                  dark: '#112D4E',
                },
                background: {
                  default: '#F9F7F7',
                  paper: '#ffffff',
                },
                text: {
                  primary: '#000000',
                  secondary: 'rgba(0, 0, 0, 0.6)',
                },
              }
            : {
                primary: {
                  main: '#818cf8',
                  dark: '#6366f1',
                },
                background: {
                  default: '#0b1120',
                  paper: '#1e293b',
                },
                text: {
                  primary: '#f8fafc',
                  secondary: '#94a3b8',
                },
              }),
        },
        typography: {
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          h1: { fontFamily: "'Outfit', system-ui, -apple-system, sans-serif" },
          h2: { fontFamily: "'Outfit', system-ui, -apple-system, sans-serif" },
          h3: { fontFamily: "'Outfit', system-ui, -apple-system, sans-serif" },
          h4: { fontFamily: "'Outfit', system-ui, -apple-system, sans-serif" },
          h5: { fontFamily: "'Outfit', system-ui, -apple-system, sans-serif" },
          h6: { fontFamily: "'Outfit', system-ui, -apple-system, sans-serif" },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: `
              body {
                transition: background-color 0.3s ease, color 0.3s ease;
              }
            `,
          },
        },
      }),
    [mode]
  );

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <CustomThemeProvider>
      <MuiThemeWrapper>
        {children}
      </MuiThemeWrapper>
    </CustomThemeProvider>
  );
};
