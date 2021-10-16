import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { BrowserRouter as Router } from 'react-router-dom';

import AssociatedDeals from './components/AssociatedDeals';

const dealData = [
  {
    _id: '615dd186ee3a517af8efc926',
    name: 'Musiali deal',
    value: 400150,
    current_stage: 1,
    pipeline: '61539fc39dc12b1bdd4529ce',
    owner: {
      first_name: 'Tevin',
      last_name: 'Banton',
      _id: '61565cba5fe7d02c7753c12a',
    },
  },
  {
    _id: '615dd186ee3a517af8efc935',
    name: 'Pogba Deal',
    value: 67150,
    current_stage: 1,
    pipeline: '61539fc39dc12b1bdd4529ce',
    owner: {
      first_name: 'Tevin',
      last_name: 'Banton',
      _id: '61565cba5fe7d02c7753c12a',
    },
  },

  {
    _id: '615dd186ee3a517af8efc924',
    name: 'Messi Deal',
    value: 89782321,
    current_stage: 1,
    pipeline: '61539fc39dc12b1bdd4529ce',
    owner: {
      first_name: 'Tevin',
      last_name: 'Banton',
      _id: '61565cba5fe7d02c7753c12a',
    },
  },
];

function App() {
  return (
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
            <div style={{ width: '40%' }}>
              <AssociatedDeals deals={dealData} />
            </div>
          </Provider>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
