import './index.css';
import { useState, useEffect, useRef } from 'react';
import NotificationViewer from '../NotificationViewer';
import Search from '../Search';
import PickList from '../PickList';
import { SearchType } from '../../types';
import { NavLinks } from '../SideBar';
import IconButton from '../IconButton';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Collapse, Dialog } from '@mui/material';
import { debounce } from '../../utils';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { logout } from '../../store/slices/user';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/redux';

const searchTypeOptions = [
  { text: 'Contact', value: 'Contact', selected: true },
  { text: 'Account', value: 'Account', selected: false },
  { text: 'Deal', value: 'Deal', selected: false },
  { text: 'Profile', value: 'Profile', selected: false },
];

export default function AppBar() {
  const [showSideBar, setShowSideBar] = useState(false);
  const [showHiddenSearch, setShowHiddenSearch] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const notifData = useAppSelector((state) => state.user.notifications);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const breakpoint = 500;

    function handleResize() {
      if (window.innerWidth >= breakpoint) {
        setShowHiddenSearch(false);
        setShowSideBar(false);
      }
    }

    const debouncedHandleResize = debounce(handleResize, 500);

    window.addEventListener('resize', debouncedHandleResize);

    return () => window.removeEventListener('resize', debouncedHandleResize);
  }, []);

  const sideNavRef = useRef<HTMLDivElement | null>(null);
  const notifRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleNotifClickAway(event: MouseEvent) {
      if (!notifRef.current?.contains(event.target as Node)) {
        setShowNotification(false);
      }
    }

    function handleNavClick(event: MouseEvent) {
      if (sideNavRef.current?.contains(event.target as Node)) {
        setTimeout(() => {
          setShowSideBar(false);
        }, 500);
      }
    }

    document.addEventListener('click', handleNotifClickAway);
    document.addEventListener('click', handleNavClick);

    return () => {
      document.removeEventListener('click', handleNotifClickAway);
      document.removeEventListener('click', handleNavClick);
    };
  }, []);

  const [notifContainerClass, setNotifContainerClass] = useState('');
  useEffect(() => {
    if (showNotification) {
      setTimeout(() => {
        setNotifContainerClass('notif-container__notifs--show');
      }, 100);
    } else {
      setTimeout(() => {
        setNotifContainerClass('');
      }, 0);
    }
  }, [showNotification]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="app-bar">
      <div className="app-bar__main">
        <div className="app-bar__left">
          <div className="show-sidebar__container">
            <IconButton
              onClick={() => setShowSideBar(!showSideBar)}
              aria-label="show navigation"
            >
              <MenuOutlinedIcon />
            </IconButton>
          </div>
        </div>
        <div className="app-bar__right">
          <div className="search-main__container">
            <Search
              searchTypeList={(setType) => (
                <PickList
                  optionsData={searchTypeOptions}
                  afterChange={(value) => setType(value as SearchType)}
                />
              )}
              searchType="Contact"
              shouldSubmit={true}
            />
          </div>
          <div className="show-search__container">
            <IconButton
              aria-label="show search box"
              onClick={() => setShowHiddenSearch(!showHiddenSearch)}
            >
              <SearchOutlinedIcon />
            </IconButton>
          </div>
          <div className="add-doc__containder">
            <IconButton aria-label="add new document">
              <AddCircleOutlinedIcon />
            </IconButton>
          </div>
          <div ref={notifRef} className="notif__container">
            <IconButton
              onClick={() => setShowNotification(!showNotification)}
              aria-label="notifications"
            >
              <NotificationsOutlinedIcon />
            </IconButton>
            <div
              className={clsx(
                'notif-container__notifs',
                showNotification && 'show-hidden',
                notifContainerClass
              )}
            >
              <NotificationViewer
                open={showNotification}
                notificationData={notifData}
              />
            </div>
          </div>
          <div>
            <IconButton onClick={handleLogout} aria-label="logout">
              <LogoutOutlinedIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <Collapse orientation="vertical" in={showHiddenSearch} collapsedSize={0}>
        <div className="app-bar__drawer">
          <div className="search-hidden__containe">
            <Search
              searchTypeList={(setType) => (
                <PickList
                  optionsData={searchTypeOptions}
                  afterChange={(value) => setType(value as SearchType)}
                />
              )}
              searchType="Contact"
              shouldSubmit={true}
            />
          </div>
        </div>
      </Collapse>
      <div>
        <Dialog
          aria-label="navigation links"
          open={showSideBar}
          onClose={() => setShowSideBar(false)}
        >
          <div ref={sideNavRef} className="app-bar__hidden-nav">
            <NavLinks isOpen currentUrl={location.pathname} />
          </div>
        </Dialog>
      </div>
    </div>
  );
}