import React, { Fragment } from 'react';
import { Redirect, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Postos from './components/postos/Postos';
import Home from './components/home/Home';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path='/postos' component={Postos} />
            <Route render={() => <Redirect to={{ pathname: "/" }} />} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
