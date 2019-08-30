import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import store from '../store';
import history from '../utils/history';
import Routes from './Routes';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Routes />
      </Router>
    </Provider>
  );
}

App.propTypes = {
  store: PropTypes.object,
  history: PropTypes.func
}

export default App;
