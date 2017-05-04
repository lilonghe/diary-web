import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import './editor.css';

import { BrowserRouter as Router } from 'react-router-dom';

import Park from './module/park/Park';
import Login from './module/user/Login';
import Reg from './module/user/Reg';


import DiaryList from './module/admin/diary/List';
import CreateDiary from './module/admin/diary/Create';


ReactDOM.render(
    <Router>
      <App />
    </Router>,
  document.getElementById('root')
);
