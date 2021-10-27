import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './components/login/Login';

ReactDOM.render(
  <BrowserRouter>
   <Switch>
    <Route path='/login'>
      <Login />
    </Route>
    <Route path ="/">
      <App />
    </Route>
    </ Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
