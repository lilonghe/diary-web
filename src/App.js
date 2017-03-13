import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
class App extends Component {
  render() {
      return (
          <MuiThemeProvider muiTheme={getMuiTheme()}>
              <div className="body">
                {this.props.children}
              </div>
          </MuiThemeProvider>
    );
  }
}

export default App;
