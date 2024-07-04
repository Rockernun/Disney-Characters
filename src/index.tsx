import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { darkTheme } from "./theme";
import { ThemeProvider } from 'styled-components';
import { HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
      <HelmetProvider>
      <ThemeProvider theme={darkTheme}>
        <App />
      </ThemeProvider>
    </HelmetProvider>
    </React.StrictMode>
);


