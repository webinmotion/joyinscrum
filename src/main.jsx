import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './component/Layout.jsx';
import './index.scss';
import App from './App.jsx';
import { AppContextProvider } from './store/index.jsx';
import { BrowserRouter } from "react-router-dom";
import {
  createTheme,
} from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#551a8b',
    },
    secondary: {
      main: '#f5780b',
    },
    background: {
      default: '#e4e4e4',
      paper: '#f4f7f7',
    },
    warning: {
      main: '#006064',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContextProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Layout>
            <App />
          </Layout>
        </BrowserRouter>
      </ThemeProvider >
    </AppContextProvider>
  </React.StrictMode>,
)
