import React, {Component} from 'react';

import {Card, CardHeader,CardText} from 'material-ui/Card';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class ParkItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            diary: this.props.value
        };
    }
    

    render(){
        return (
            
            <div className="park-item">
                <MuiThemeProvider muiTheme={muiTheme}>
                    <Card>
                        <CardHeader
                            title={this.state.diary.user.name}/>
                            <CardText>{this.state.diary.content}</CardText>
                    </Card>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default ParkItem;