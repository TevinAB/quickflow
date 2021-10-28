import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

import FormManager from './components/FormManager';
import ContactPage from './pages/Contact';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <>
      <ContactPage />
      <FormManager />
    </>
  );
}

export default App;
