import './index.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../SideBar';
import { debounce } from '../../utils';

const mobile = 425;
export default function NavBar() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    const debouncedResizeHandler = debounce(handleResize, 200);
    window.addEventListener('resize', debouncedResizeHandler);

    return window.removeEventListener('resize', () => {
      debouncedResizeHandler();
    });
  }, []);

  return (
    <nav className="nav-bar">
      <Link to="/">
        <Logo showText={windowWidth >= mobile} />
      </Link>
      <ul className="nav-bar__items">
        <li>
          <Link to="/login">
            <span className="btn btn--login">Login</span>
          </Link>
        </li>
        <li>
          <Link to="/sign-up">
            <span className="btn btn--sign-up">Sign Up</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
