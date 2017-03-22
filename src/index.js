import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import {Router,Route,browserHistory,IndexRoute} from 'react-router';

import Park from './module/park/Park';
import Login from './module/user/Login';
import Reg from './module/user/Reg';


import DiaryList from './module/admin/diary/List';
import CreateDiary from './module/admin/diary/Create';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Park} />
      <Route path='/park' component={Park} />
      <Route path='/login' component={Login} />
      <Route path='/reg' component={Reg} />

      <Route path="/admin/diary" component={DiaryList} />
			<Route path="/admin/diary/create" component={CreateDiary} />
    </Route>
  </Router>,
  document.getElementById('root')
);
