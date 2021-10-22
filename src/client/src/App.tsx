import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom';

import DealSummaryChartWidget from './components/DealSummaryChartWidget';

function App() {
  return (
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
              <div style={{ width: '80%' }}>
                <DealSummaryChartWidget />
              </div>
            </Provider>
          </ThemeProvider>
        </Router>
      </div>
    </StyledEngineProvider>
  );
}

export default App;
