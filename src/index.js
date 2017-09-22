import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './index.styl';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

if (module.hot) {
   module.hot.accept();
}