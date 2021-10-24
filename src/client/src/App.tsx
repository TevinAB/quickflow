import './App.css';
import FormManager from './components/FormManager';
import { useAppDispatch } from './hooks/redux';
//import { useDispatch } from 'react-redux';
import { showForm } from './store/slices/formManager';
import { useEffect } from 'react';
import {
  isAuthenticatedThunk,
  logout,
  resumeSession,
} from './store/slices/user';
import { getFromLocalStorage } from './utils/localStorage';
import { TOKEN_NAME } from './constants';

function App() {
  const dispatch = useAppDispatch();
  const onClick = () =>
    dispatch(showForm({ formType: 'Contact', formMode: 'New', _id: 'id' }));

  useEffect(() => {
    async function sessionCheck() {
      const token = getFromLocalStorage(TOKEN_NAME) || '';

      try {
        const result = await dispatch(isAuthenticatedThunk(token)).unwrap();
        result.token = token;

        dispatch(resumeSession({ userData: result }));
      } catch (error) {
        dispatch(logout());
      }
    }

    sessionCheck();
  }, [dispatch]);

  return (
    <div style={{ width: '80%' }}>
      <button onClick={onClick}>Show form</button>
      <FormManager />
    </div>
  );
}

export default App;
