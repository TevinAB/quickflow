import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom';

import TaskTodayWidget from './components/TaskTodayWidget';
import EventTodayWidget from './components/EventTodayWidget';

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
                <TaskTodayWidget />
                <div style={{ height: '40px' }}></div>
                <EventTodayWidget />
              </div>
            </Provider>
          </ThemeProvider>
        </Router>
      </div>
    </StyledEngineProvider>
  );
}

export default App;
