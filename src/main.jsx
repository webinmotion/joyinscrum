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
  // ThemeProvider
} from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
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
