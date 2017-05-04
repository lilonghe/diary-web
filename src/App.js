import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import { Link } from 'react-router-dom';
import Utils from './common/utils';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin()

import store from './store/appStore';

import {Router,Route, BrowserRouter, Redirect} from 'react-router-dom';

import Park from './module/park/Park';
import Login from './module/user/Login';
import Reg from './module/user/Reg';


import DiaryList from './module/admin/diary/List';
import CreateDiary from './module/admin/diary/Create';
class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      user: {}
    };
    let that = this;
    store.addLoginCallBack(function(){
      that.setState({
        user: JSON.parse(Utils.getItem('user'))
      });
    }.bind(this));
  }

  componentWillMount(){
    store.executeLogin();
  }

  logout(){
    store.logout();
    this.setState({
      user: {}
    })
  }

  render() {
      var status;
      if(this.state.user.name){
        status = (
          <ul>
            <li><Link to="/admin/diary">{this.state.user.name}</Link></li>
            <li><Link to="/admin/diary/create">Create</Link></li>
            <li onClick={this.logout.bind(this)}>Logout</li>            
          </ul>
        )
      }else{
        status = (<ul>
          <li><Link to="/login">Login</Link></li>
        </ul>)
      }

      var body;
      if(this.state.user.name){
        body = (
          <div className="body">
            <Route exact path='/' component={Park} />
            <Route path='/login' component={Login} />
            <Route path='/reg' component={Reg} />
            <Route path='/logout' component={Login} />
            <Route exact path="/admin/diary" component={DiaryList} />
            <Route path="/admin/diary/create" component={CreateDiary} />
          </div>
        )
      }else{
        body = (
          <div className="body">
            <Route exact path='/' component={Login} />
            <Route path='/login' component={Login} />
            <Route path='/reg' component={Reg} />

            <Redirect to={'/login'} />
          </div>
        )
      }
      return (
          <BrowserRouter>
            <MuiThemeProvider muiTheme={getMuiTheme()}>
              <div>
                <header>
                  <div className="copy"><Link to="/">Diary</Link></div>
                  {status}
                </header>

                {body}
              </div>
            </MuiThemeProvider>
          </BrowserRouter>
          
    );
  }
}
export default App;
