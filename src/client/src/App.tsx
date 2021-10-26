import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

import FormManager from './components/FormManager';
import LandingPage from './pages/LandingPage';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <>
      <LandingPage />
      <FormManager />
    </>
  );
}

export default App;
