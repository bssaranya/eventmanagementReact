import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import Home from './Home';
import { useSelector } from 'react-redux';
import PrivateRouting from './PrivateRouting';
import ChangePswd from './admin/ChangePswd';
import HeaderNav from './HeaderNav';
import { encrypt } from '../utils/passwordEncryption';
import Dashboard from './admin/Dashboard';
import Event from './admin/Event';
import Organisation from './admin/Organisation';
import OrganisationList from './admin/OrganisationList';
import EventList from './admin/EventList';
import UserEvent from './UserEvent';
import DisplayEvent from './DisplayEvent';
import About from './About';
import Footer from './Footer';
import Login from './Login';

const App = () => {
  const { islogin } = useSelector((state) => state.oauthReducer);

  return (
    <>
      <Router history={history}>
        <HeaderNav />
        {/* Private routing */}
        <Switch>
          <PrivateRouting path="/dashboard" isAuthenticated={islogin}>
            <Dashboard />
          </PrivateRouting>
          <PrivateRouting path="/change-pswd" isAuthenticated={islogin}>
            <ChangePswd />
          </PrivateRouting>
          <PrivateRouting path="/events" isAuthenticated={islogin}>
            <EventList />
          </PrivateRouting>
          <PrivateRouting path="/add-event" isAuthenticated={islogin}>
            <Event />
          </PrivateRouting>
          <PrivateRouting path="/edit-event/:editId" isAuthenticated={islogin}>
            <Event />
          </PrivateRouting>
          <PrivateRouting path="/organisation-add" isAuthenticated={islogin}>
            <Organisation />
          </PrivateRouting>
          <PrivateRouting
            path="/edit-organisation/:orgId"
            isAuthenticated={islogin}
          >
            <Organisation />
          </PrivateRouting>
          <PrivateRouting path="/organisation" isAuthenticated={islogin}>
            <OrganisationList />
          </PrivateRouting>
        </Switch>
        {/* Public Routing */}
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/about" exact component={About} />
        <Route path="/userevent" exact component={UserEvent} />
        <Route path="/view-event/:viewId" exact component={DisplayEvent} />

        {/* show footer part before login */}
        {!islogin ? (
          <div className="mt-5">
            <Footer />
          </div>
        ) : null}
      </Router>
    </>
  );
};

export default App;
