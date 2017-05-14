import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, notification } from 'antd';
const FormItem = Form.Item;

import Request from '../../config/request';

class Reg extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var that = this;
                Request.reg({ name: values.account, pass: values.pass,invite: values.invite }, (err) => {
                    notification['error']({
                        message: '注册失败',
                        description: err.errmsg,
                    });
                }, (data) => {
                    let path = '/login';
                    this.props.history.push(path);
                });
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="page page-reg wrapper">
                <Form onSubmit={this.handleSubmit} className="reg-form">
                    <FormItem>
                    {getFieldDecorator('account', {
                        rules: [{ required: true, message: 'Please input your Account!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Account" />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('pass', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('invite', {
                        rules: [{ required: true, message: 'Please input your invite code!' }],
                    })(
                        <Input prefix={<Icon type="code-o" style={{ fontSize: 13 }} />} type="password" placeholder="invite code" />
                    )}
                    </FormItem>
                    <FormItem>
                    
                    <Button type="primary" htmlType="submit" className="reg-form-button">
                        Register
                    </Button> Or <Link to="/login">login</Link>
                    </FormItem>
                </Form>
                
            </div>
        );
    }
}

const RegPage = Form.create()(Reg);
export default RegPage;