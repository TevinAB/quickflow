import './index.css';
import { Ref, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../SideBar';
import { debounce } from '../../utils';
import Button from '../Button';

const mobile = 425;
type NavProps = {
  navRef?: Ref<HTMLElement>;
  loginOnClick: () => void;
  signUpOnClick: () => void;
};
export default function NavBar({
  navRef,
  loginOnClick,
  signUpOnClick,
}: NavProps) {
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
    <nav ref={navRef} className="nav-bar">
      <Link to="/">
        <Logo showText={windowWidth >= mobile} />
      </Link>
      <ul className="nav-bar__items">
        <li>
          <Button className="btn btn--login" onClick={loginOnClick}>
            Login
          </Button>
        </li>
        <li>
          <Button className="btn btn--sign-up" onClick={signUpOnClick}>
            Sign Up
          </Button>
        </li>
      </ul>
    </nav>
  );
}
