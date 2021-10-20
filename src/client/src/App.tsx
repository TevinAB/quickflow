import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom';

import Search from './components/Search';
import { SearchType } from './types';
import PickList from './components/PickList';

const picklistData = [
  { text: 'Contact', value: 'Contact', selected: true },
  { text: 'Account', value: 'Account', selected: false },
  { text: 'Deal', value: 'Deal', selected: false },
  { text: 'Profile', value: 'Profile', selected: false },
];

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <div
        style={{
          paddingTop: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
        className="App"
      >
        <Router>
          <ThemeProvider theme={theme}>
            <Provider store={store}>
              <div style={{ width: '60%' }}>
                <Search
                  searchTypeList={(setType) => (
                    <PickList
                      optionsData={picklistData}
                      afterChange={(value) => setType(value as SearchType)}
                    />
                  )}
                  searchType="Contact"
                  shouldSubmit={true}
                />
              </div>
            </Provider>
          </ThemeProvider>
        </Router>
      </div>
    </StyledEngineProvider>
  );
}

export default App;

/**
 * <Search shouldSubmit={true} searchType="Contact" />
 */
