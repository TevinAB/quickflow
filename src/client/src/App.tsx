import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { BrowserRouter as Router } from 'react-router-dom';

import SideBar from './components/SideBar';

function App() {
  return (
    <div
      style={{
        paddingTop: 0,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'start',
      }}
      className="App"
    >
      <Router>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <SideBar renderLogo={true} renderCollapseButton={true} />
          </Provider>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
