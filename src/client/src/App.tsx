import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

import FormManager from './components/FormManager';
import Dashboard from './pages/Dashboard';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <>
      <Dashboard />
      <FormManager />
    </>
  );
}

export default App;
