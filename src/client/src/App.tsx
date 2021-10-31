import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

import FormManager from './components/FormManager';
import { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import QuickFlow from './pages/QuickFlow';
import { useAppSelector, useAppDispatch } from './hooks/redux';
import { isAuthenticatedThunk } from './store/slices/user';
import { getFromLocalStorage } from './utils/localStorage';
import { TOKEN_NAME } from './constants';
import { WidgetLoading } from './components/WidgetUtils';

function App() {
  const auth = useAppSelector((state) => state.user.is_authenticated);
  const auth_check_loading = useAppSelector(
    (state) => state.user.auth_check_loading
  );
  const dispatch = useAppDispatch();

  //animate on scroll library init
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  //check if user has a valid token stored
  useEffect(() => {
    async function checkAuthentication() {
      let token;
      try {
        token = getFromLocalStorage(TOKEN_NAME) || '';
      } catch (error) {
        //if local storage can't be used for some reason
        token = 'none';
      }
      await dispatch(isAuthenticatedThunk(token));
    }

    checkAuthentication();
  }, [dispatch]);

  if (auth_check_loading) {
    return (
      <div className="app-loading-overlay">
        <WidgetLoading />
      </div>
    );
  }

  return (
    <>
      <Switch>
        <Route
          exact
          path="/login"
          render={() => (auth ? <Redirect to="/" /> : <LandingPage />)}
        />

        <ProtectedRoute path="/" redirectPath="/login" auth={auth}>
          <QuickFlow />
        </ProtectedRoute>
      </Switch>
      <FormManager />
    </>
  );
}

export default App;
