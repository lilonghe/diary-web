import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, notification } from 'antd';
const FormItem = Form.Item;

import request from '../../config/request';
import { withRouter } from 'react-router-dom';
import store from '../../store/appStore';
class Login extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var that = this;
                request.login({ name: values.userName, pass: values.password }, (err) => {
                    console.log(err);
                    notification['error']({
                        message: '登录失败',
                        description: err.errmsg,
                    });
                }, (data) => {
                    localStorage.setItem('user', JSON.stringify(data.data));
                    store.executeLogin();
                    this.props.history.push('/')
                });
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="page page-login wrapper">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                    )}
                    </FormItem>
                    <FormItem>
                    
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button> Or <Link to="/reg">register now!</Link>
                    </FormItem>
                </Form>
                
            </div>
        );
    }
}


const LoginPage = Form.create()(Login);
export default LoginPage;