import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material';
import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Default primary color
    },
    error: {
      main: '#d32f2f', // Default error color
    },
    // Add custom colors if needed
    gx_no_16: {
      main: '#some-hex-color', // Define gx_no_16 if required
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);