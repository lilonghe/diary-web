import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';

import RaisedButton from 'material-ui/RaisedButton';


export default class Login extends Component {
    render() {
        return (
            <div className="page-login">
                <div className="wrapper">
                    <Card>
                        <CardText>
                            <TextField floatingLabelText="Account" hintText="Account:" /><br />
                            <TextField floatingLabelText="Pass" hintText="Pass:" type="password" />
                        </CardText>
                        <CardActions>
                            <RaisedButton label="submit" primary={true}  />
                        </CardActions>
                    </Card>
                </div>
                
                
            </div>
        );
    }
}