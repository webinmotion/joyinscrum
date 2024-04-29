import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './component/Layout.jsx';
import './index.scss';
import App from './App.jsx';
import { AppContextProvider } from './store/index.jsx';
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#551a8b',
    },
    secondary: {
      main: '#f57f17',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AppContextProvider>
        <BrowserRouter>
          <Layout>
            <App />
          </Layout>
        </BrowserRouter>
      </AppContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
