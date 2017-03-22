import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import { browserHistory,Link } from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin()
class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      open: false
    };
  }

  handleToggle(){
    let resu = !this.state.open;
    this.setState({
      open: resu
    });
  }

  touchDrawer(){
    
  }

  render() {
      return (
          <MuiThemeProvider muiTheme={getMuiTheme()}>
              <div>
                <AppBar
                  title="Diary"
                  iconElementLeft={ 
                      <IconButton onTouchTap={ this.handleToggle.bind(this) }  >
                        <MenuIcon />
                      </IconButton> }
                  isInitiallyOpen={ true }
                />
                <Drawer docked={false} width={200} open={this.state.open} onRequestChange={(open) => this.setState({open})}>
                  <Link onTouchTap={ this.handleToggle.bind(this)} to="/"><MenuItem onTouchTap={this.handleClose}>Main</MenuItem></Link>
                  <Link onTouchTap={ this.handleToggle.bind(this)} to="/admin/diary"><MenuItem onTouchTap={this.handleClose}>My Diary</MenuItem></Link>
                  <Link onTouchTap={ this.handleToggle.bind(this)} to="/admin/diary/create"><MenuItem onTouchTap={this.handleClose}>Create Diary</MenuItem></Link>
                </Drawer>

                <div className="body">
                  {this.props.children}
                </div>
              </div>
              
          </MuiThemeProvider>
    );
  }
}

export default App;
