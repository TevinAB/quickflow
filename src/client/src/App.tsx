import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

import FormManager from './components/FormManager';
import { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import QuickFlow from './pages/QuickFlow';
import { useAppSelector } from './hooks/redux';

function App() {
  const auth = useAppSelector((state) => state.user.is_authenticated);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

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
