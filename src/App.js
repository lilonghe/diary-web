import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import { browserHistory,Link } from 'react-router';
import Utils from './common/utils';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin()

import store from './store/appStore';
class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      user: {}
    };
    
    store.addLoginCallBack(function(){
      console.log(Utils.getItem('user'));
      this.setState({
        user: JSON.parse(Utils.getItem('user'))
      });
    }.bind(this));
  }

  componentWillMount(){
     let user = Utils.getItem('user');
    if(user){
      user = JSON.parse(user);
      store.executeLogin();
    }else{
      let path = '/login';
      browserHistory.replace(path);
    }
  }

  render() {
      var status;
      if(this.state.user.name){
        status = (
          <ul>
            <li><Link to="/admin/diary">{this.state.user.name}</Link></li>
            <li><Link to="/admin/diary/create">Create</Link></li>
          </ul>
        )
      }else{
        status = <ul></ul>;
      }
      return (
          <MuiThemeProvider muiTheme={getMuiTheme()}>
              <div>
                <header>
                  <div className="copy">Diary</div>

                  {status}
                </header>
                {/*<Drawer docked={false} width={200}>
                  <Link onTouchTap={ this.handleToggle.bind(this)} to="/"><MenuItem onTouchTap={this.handleClose}>Main</MenuItem></Link>
                  <Link onTouchTap={ this.handleToggle.bind(this)} to="/admin/diary"><MenuItem onTouchTap={this.handleClose}>My Diary</MenuItem></Link>
                  <Link onTouchTap={ this.handleToggle.bind(this)} to="/admin/diary/create"><MenuItem onTouchTap={this.handleClose}>Create Diary</MenuItem></Link>
                </Drawer>*/}

                <div className="body">
                  {this.props.children}
                </div>
              </div>
              
          </MuiThemeProvider>
    );
  }
}
export default App;
