import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Divider, Checkbox, Button, AutoComplete, DatePicker, Alert, Radio } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';

import { getSavedToken } from './config';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
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
            isDisabled: false,
            displayPartyTextBox:false,
            hasuraId:-1
            
        };

    }

    handleOnLoad = () => {
       console.log('onLoadFunc');
        axios({
            method: 'post',
            url: 'https://api.artfully11.hasura-app.io/data',
            data: { auth: authToken },
            config: { headers: { 'Content-Type': 'application/json' } }
        })
            .then(response => {
                console.log(response.data.hasura_id);
                this.setState({ hasuraId: response.data.hasura_id });
            })
            .catch(error => {
                alert('Sorry! Server Error!');
                console.log('Post request to get hasura Id failed!');
            });
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
                var hasura_id_nominee = this.state.hasuraId;
                var election_id = this.props.match.params.id;
                var manifesto_got = values.manifesto;
                var independent_flag = null;
                var party_name =null;
                var party_ticket_id =null;
                if (values.partyOrIndependent === 'independent')
                {
                     independent_flag = true;
                   
                }
                else if (values.partyOrIndependent === 'party')
                {
                     independent_flag = false;
                     party_name = values.partyName;
                     party_ticket_id = values.partyTicket;
                }
                axios({
                    method: 'post',
                    url: 'https://api.artfully11.hasura-app.io/nominate',
                    data: { id: hasura_id_nominee, eid: election_id, manifesto: manifesto_got, individual: independent_flag, party: party_name, party_ticket: party_ticket_id},
                    config: { headers: { 'Content-Type': 'application/json' } }
                })
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        alert('Sorry! You cannot nominate yourself for this post!');
                        console.log('Post request to get hasura Id failed!');
                    });
                

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
               
                    <h1 style={{ marginTop: "10px", textAlign: "center" }}>Enter Nomination Details</h1>
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
                            {getFieldDecorator('manifesto', {
                                rules: [{ required: true, message: 'Please input your manifesto!', whitespace: true }],
                            })(
                            <TextArea rows={4} />
                                )}
                        </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
                                Please select:&nbsp;
                            </span>
                        )}
                    >
                        
                        {getFieldDecorator('partyOrIndependent', {
                            rules: [{ required: true, message: 'Please select an option!' }],
                        })(
                            <RadioGroup defaultValue="a" onChange={(value) => this.setState({ displayPartyTextBox: (value.target.value === 'party') })}>
                                <RadioButton value="party">Party Candidate</RadioButton>
                                <RadioButton value="independent">Independent Candidate</RadioButton>
                            </RadioGroup>
                            )}
                    </FormItem>

                    {this.state.displayPartyTextBox && <div>
                        <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
                                Party Name&nbsp;
                            </span>
                        )}
                    >
                        {getFieldDecorator('partyName', {
                            rules: [{ required: true, message: 'Please enter your party name!', whitespace: true }],
                        })(
                            <Input />
                            )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
                                Party Ticket ID/Number&nbsp;
                            </span>
                        )}
                    >
                        {getFieldDecorator('partyTicket', {
                            rules: [{ required: true, message: 'Please enter your party ticket id/no.!', whitespace: true }],
                        })(
                            <Input />
                            )}
                    </FormItem>
                    </div>}


                       

                   

                      
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" disabled={this.state.isDisabled} loading={this.state.loading} onClick={this.enterLoading}>
                                Submit Nomination
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
