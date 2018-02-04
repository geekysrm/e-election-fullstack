import React from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import './Auth.css';
import { Form, Icon, Input, Button, Modal } from 'antd';

import { saveOffline, getSavedToken } from './config';
import { authenticateUser } from './api';

const FormItem = Form.Item;

class AuthForm extends React.Component {

  constructor() {
    super()
    this.state = {
      uesrName: '',
      password: ''
    };
  }

  showModal = () => {
    console.log("Hello");
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        console.log('on register clicked');
        //this.showProgressIndicator(true)
        console.log(values.userName);
        console.log(values.password);
        console.log(values.cpassword);
       if(values.password === values.cpassword)
       {
         authenticateUser(values.userName, values.password, true).then(authResponse => {
           //this.showProgressIndicator(false)
           console.log(authResponse);
           if (authResponse.auth_token) {
             saveOffline(authResponse.auth_token);

            this.showModal();
            
             Modal.success({
               title: 'Registered Successfully!',
               content: 'Taking you to login...',
             });
             window.location.assign("/auth-login");

           } else {
             alert(JSON.stringify(authResponse));
           }
         });
       }
       else {
         alert('Please enter same password in both fields!');
       }

      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const styleObj = {
      height: '275px',
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
            {getFieldDecorator('cpassword', {
              rules: [{ required: true, message: 'Please confirm your Password!' }],
            })(
              <Input prefix={<Icon type="lock"
                style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Confirm Password"
                onChange={this.handleuesrNameChange}
              />
              )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button" >
              Register
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const AuthRegister = Form.create()(AuthForm);

export {
  AuthRegister
};
