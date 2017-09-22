import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './index.styl';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <Route path="/" component={App}/>
  </Router>,
  document.getElementById('root')
);

if (module.hot) {
   module.hot.accept();
}