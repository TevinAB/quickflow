import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

import FormManager from './components/FormManager';
import ContactList from './pages/ContactList';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <>
      <ContactList />
      <FormManager />
    </>
  );
}

export default App;
