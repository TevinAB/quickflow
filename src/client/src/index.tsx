import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import store from './store';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mock-sw/browserWorker');
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <div
        style={{
          height: '120vh',
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'center',
        }}
        className="App"
      >
        <Router>
          <ThemeProvider theme={theme}>
            <Provider store={store}>
              <App />
            </Provider>
          </ThemeProvider>
        </Router>
      </div>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
