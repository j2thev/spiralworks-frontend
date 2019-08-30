import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import AppHeader from './AppHeader';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';

class Routes extends Component {
  render() {
    return (
      <div>
        <AppHeader />
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/join' component={Register} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/*' component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default Routes;
