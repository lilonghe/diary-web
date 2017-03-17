import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';

import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Request from '../../config/request';
import { browserHistory } from 'react-router';
export default class Reg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            pass: '',
            open: false,
            errmsg: '',
            invite: ''
        };
    }

    reg() {
        var that = this;
        Request.reg({ name: this.state.account, pass: this.state.pass,invite: this.state.invite }, (err) => {
            this.setState({
                open: true,
                errmsg: err.errmsg
            });
        }, (data) => {
            let path = '/login';
            browserHistory.push(path);
        });


    }

    render() {
        return (
            <div className="page-login">
                <div className="wrapper">
                    <Card>
                        <CardText>
                            <TextField floatingLabelText="Account" hintText="Account:" value={this.state.account} onChange={(event, value) => this.setState({ account: value })} /><br />
                            <TextField floatingLabelText="Pass" hintText="Pass:" type="password" value={this.state.pass} onChange={(event, value) => this.setState({ pass: value })} /><br />
                            <TextField floatingLabelText="Invite" hintText="Invite:" value={this.state.invite} onChange={(event, value) => this.setState({ invite: value })} />
                        </CardText>
                        <CardActions>
                            <RaisedButton onClick={this.reg.bind(this)} label="submit" primary={true} />
                        </CardActions>
                    </Card>
                </div>
                <Snackbar
                    className="errtip"
                    open={this.state.open}
                    message={this.state.errmsg}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        );
    }

    handleTouchTap = () => {
        this.setState({
            open: true,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

}