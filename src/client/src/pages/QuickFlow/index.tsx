import './index.css';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Dashboard from '../Dashboard';
import ContactPage from '../Contact';
import DocumentList from '../DocumentList';
import SideBar from '../../components/SideBar';
import AppBar from '../../components/AppBar';
import { useEffect, useRef, useState } from 'react';
import AccountPage from '../Account';
import DealPage from '../Deal';

export default function QuickFlow() {
  const appBarRef = useRef<HTMLDivElement | null>(null);
  const [appBarHeight, setAppBarHeight] = useState(80);
  const match = useRouteMatch();

  useEffect(() => {
    const height = appBarRef.current?.clientHeight || 80;
    setAppBarHeight(height);
  }, [appBarRef]);

  return (
    <div className="main-app">
      <div className="side-bar-container">
        <SideBar showLogo showCollapseButton />
      </div>

      <div style={{ width: '100%' }}>
        <div className="app-bar-container">
          <AppBar navContainerRef={appBarRef} />
        </div>

        <div
          style={{ height: `calc(100vh - ${appBarHeight + 2}px)` }}
          className="page-container"
        >
          <Switch>
            <Route exact path={match.path}>
              <Dashboard />
            </Route>

            <Route exact path={`${match.path}contact/:id`}>
              <ContactPage />
            </Route>
            <Route exact path={`${match.path}contacts`}>
              <DocumentList documentType="Contact" />
            </Route>

            <Route exact path={`${match.path}account/:id`}>
              <AccountPage />
            </Route>
            <Route exact path={`${match.path}accounts`}>
              <DocumentList documentType="Account" />
            </Route>

            <Route exact path={`${match.path}deal/:id`}>
              <DealPage />
            </Route>
            <Route exact path={`${match.path}deals`}>
              <DocumentList documentType="Deal" />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}
