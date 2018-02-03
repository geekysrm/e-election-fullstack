import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Divider, Checkbox, Button, AutoComplete, DatePicker, Alert } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';

import { getSavedToken } from './config';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const authToken = getSavedToken();
class CredentialsForm extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            loading:false,
            isDisabled: false
            
        };

    }

    handleOnLoad = () => {
       
    }

    componentWillMount() {
        window.addEventListener('load', this.handleOnLoad);
    }
    componentDidUpdate() {
        window.addEventListener('load', this.handleOnLoad);

    }
    enterLoading = () => {
        this.setState({ loading: true });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                
                

            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    onCopy = () => {
        this.setState({ copied: true });
    };


    render() {

        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;
        let credentialsThere = this.state.credentialsThere;
        let copied = this.state.copied;


        let alertSpan = null;
        let copiedSpan = null;
        let copiedSpan1 = null;
        if (credentialsThere) {
            alertSpan = <Alert
                message="Successfully generated Voting Credentials!"
                description={

                    <CopyToClipboard onCopy={this.onCopy} text={this.state.credentialsThere}>
                        <span style={{ cursor: 'pointer' }}>Your voting credentials are <strong>{credentialsThere}</strong>.</span>
                    </CopyToClipboard>

                }
                type="success"
                showIcon
            />;

        }
        if (copied) {
            copiedSpan = <Alert message={"Copied to clipboard!"} type="info" />
        }
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select date!' }],
        };
        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));

        return (
            <div>
               
                    <h1 style={{ marginTop: "10px", textAlign: "center" }}>Enter Voting Details</h1>
                    <Divider />
                    <Form onSubmit={this.handleSubmit} style={{
                        marginRight: "20%",
                        marginLeft: "5%",
                        marginTop: "20px"
                    }}>
                        <FormItem
                            {...formItemLayout}
                            label={(
                                <span>
                                    Full Name&nbsp;
              <Tooltip title="Please enter the same name as in your Voter ID Card.">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </span>
                            )}
                        >
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please input your Full Name!', whitespace: true }],
                            })(
                                <Input />
                                )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Gender"
                        >
                            {getFieldDecorator('gender', {
                                initialValue: ['Male'],
                                rules: [{ type: 'array', required: true, message: 'Please select your gender!' }]
                            })(
                                <Cascader options={gender} key={gender} />
                                )}
                        </FormItem>


                        <FormItem
                            {...formItemLayout}
                            label={(
                                <span>
                                    Date of Birth&nbsp;
              <Tooltip title="Please enter your DOB as in your Voter ID Card.">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </span>
                            )}
                        >
                            {getFieldDecorator('date', config)(
                                <DatePicker />
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="State"
                        >
                            {getFieldDecorator('states', {
                                initialValue: ['Andaman and Nicobar Islands'],
                                rules: [{ type: 'array', required: true, message: 'Please select your state!' }],
                            })(
                                <Cascader options={states} key={states} style={{ width: '100%' }} />
                                )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label={(
                                <span>
                                    Voter ID Number&nbsp;
              <Tooltip title="Please enter the Voter ID Number as in your Voter ID Card.">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </span>
                            )}
                        >
                            {getFieldDecorator('voterId', {
                                rules: [{ required: true, message: 'Please input your voter ID Number!' }, { pattern: '^[A-Z]{3}[0-9]{7}$', message: 'Please input valid voter ID Number!' }],
                            })(
                                <Input style={{ width: '100%' }} />
                                )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="E-mail"
                        >
                            {getFieldDecorator('email', {
                                rules: [{
                                    type: 'email', message: 'The e-mail entered is not valid!',
                                }, {
                                    required: true, message: 'Please input your E-mail!',
                                }],
                            })(
                                <Input />
                                )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="Phone Number"
                        >
                            {getFieldDecorator('phone', {
                                rules: [{ required: true, message: 'Please input your phone number!' }, { pattern: '^((\\+91-?)|0)?[0-9]{10}$', message: 'Please input a valid phone number!' }],
                            })(
                                <Input addonBefore="+91" style={{ width: '100%' }} />
                                )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" disabled={this.state.isDisabled} loading={this.state.loading} onClick={this.enterLoading}>
                                Get Voting Credentials
                        </Button>
                        </FormItem>

                       

                    </Form>
                    {alertSpan}
                
            </div>
        );
    }
}

const NominateYourself = Form.create()(NominateYourselfForm);

export default NominateYourself;
