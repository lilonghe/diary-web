import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';

import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Request from '../../config/request';
import { withRouter } from 'react-router-dom';
import store from '../../store/appStore';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            pass: '',
            open: false,
            errmsg: ''
        };
        console.log(props.appStore);
    }

    login() {
        var that = this;
        Request.login({ name: this.state.account, pass: this.state.pass }, (err) => {
            this.setState({
                open: true,
                errmsg: err.errmsg
            });
        }, (data) => {
            
            localStorage.setItem('user', JSON.stringify(data.data));
            store.executeLogin();
            this.props.history.push('/')
        });
    }

    goReg() {
        let path = '/reg';
        this.props.history.push(path)
    }

    render() {
        return (
            <div className="page-login">
                <div className="wrapper">
                    <Card>
                        <CardText>
                            <TextField floatingLabelText="Account" hintText="Account:" value={this.state.account} onChange={(event, value) => this.setState({account:value})} /><br />
                            <TextField floatingLabelText="Pass" hintText="Pass:" type="password" value={this.state.pass} onChange={(event, value) => this.setState({ pass: value })} />
                        </CardText>
                        <CardActions>
                            <RaisedButton onClick={this.login.bind(this)} label="submit" primary={true} />
                            <RaisedButton onClick={this.goReg.bind(this)} label="register" />
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