import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './components/login/Login';
import MedApp from './components/medApp/MedApp';

ReactDOM.render(
  <BrowserRouter>
   <Switch>
    <Route exact path ="/">
      <App />
    </Route>
    <Route exact path='/login'>
      <Login />
    </Route>
    <Route exact path='/visit'>
      <MedApp />
    </Route>
    </ Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
