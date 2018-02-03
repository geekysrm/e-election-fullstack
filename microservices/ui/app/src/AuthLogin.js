import React from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import './Auth.css';
import { Form, Icon, Input, Button } from 'antd';

import { saveOffline, getSavedToken } from './config';
import { authenticateUser } from './api';

const FormItem = Form.Item;

class AuthForm extends React.Component {

  constructor() {
    super()
    this.state = {
      uesrName: '',
      password: '',
      loading: false
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        console.log('Received values of form: ', values);

        console.log('on login clicked');
        //this.showProgressIndicator(true)
        console.log(values.userName);
        console.log(values.password);
        authenticateUser(values.userName, values.password, false).then(authResponse => {
          //this.showProgressIndicator(false)
          console.log(authResponse);
          if (authResponse.auth_token) {
            //Save the auth token offline to be used by the filestore service
            saveOffline(authResponse.auth_token);
            //this.showAlert("Login Successful! \n Your auth credentials are: " + JSON.stringify(authResponse, null, 2));

            window.location.assign("/home");
          } else {
            this.setState({ loading: false });
            //this.showAlert(JSON.stringify(authResponse));
            alert('Invalid login details entered!');
          }
        });

      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const styleObj = {
      height: '250px',
      width: '500px',
      margin: '20px',
      textAlign: 'center',
      display: 'inline-block',
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      padding: "24px",
      background: "#fbfbfb",
      border: "1px solid #d9d9d9",
      borderRadius: "6px",
    };

    return (
      <div  >
        <Form onSubmit={this.handleSubmit} className="login-form" style={styleObj} >
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user"
              style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
              onChange={this.handleuesrNameChange}
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock"
              style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              onChange={this.handleuesrNameChange}
              />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.loading}>
              Log in
            </Button>
            Or <a href="/auth-register">register now!</a>
            </FormItem>
        </Form>
      </div>
    );
  }
}

const AuthLogin = Form.create()(AuthForm);

export {
  AuthLogin
};
