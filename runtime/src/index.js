// Everything here is written in React with Google MUI components:
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
// Our Theme Setup:
import theme from './theme';
// Our Authentication Setup:
import { AuthContextProvider } from './auth'
// Out Page Routing Setup:
import Router from "./AP_Router";


// Entry to the entire front-end here.
// We setup the theme, then Auth, and then Page Routing.
// Each is called in that order.

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <ThemeProvider theme={theme}>
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  </ThemeProvider>
);
