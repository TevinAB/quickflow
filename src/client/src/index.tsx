import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'animate.css';
import App from './App';

import { Provider } from 'react-redux';
import store from './store';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';

const useWorker = false;

if (process.env.NODE_ENV === 'development' && useWorker) {
  const { worker } = require('./mock-sw/browserWorker');
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <div className="App">
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
