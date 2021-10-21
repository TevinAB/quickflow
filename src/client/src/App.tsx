import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom';

import AppBar from './components/AppBar';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <div style={{ height: '120vh' }} className="App">
        <Router>
          <ThemeProvider theme={theme}>
            <Provider store={store}>
              <div>
                <AppBar />
              </div>
            </Provider>
          </ThemeProvider>
        </Router>
      </div>
    </StyledEngineProvider>
  );
}

export default App;
