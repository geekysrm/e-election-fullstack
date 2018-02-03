import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Divider, Checkbox, Button, AutoComplete, DatePicker, Alert } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';

import { getSavedToken } from './config';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const { TextArea } = Input;
const authToken = getSavedToken();
class NominateYourselfForm extends React.Component {
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
                                    Manifesto&nbsp;
              <Tooltip title="Please enter your manifesto for the election.">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </span>
                            )}
                        >
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please input your manifesto!', whitespace: true }],
                            })(
                            <TextArea rows={4} />
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
