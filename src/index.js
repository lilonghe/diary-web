import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import {Router,Route,browserHistory,IndexRoute} from 'react-router';

import Park from './module/park/Park';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Park} />
      <Route path='/park' component={Park} />
    </Route>
  </Router>,
  document.getElementById('root')
);
