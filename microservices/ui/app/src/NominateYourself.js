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
            isDisabled: false,
            loading:false,
            displayPartyTextBox:false,
            hasuraId:-1,
            successMsg: false,
            nominationGoingOn: -1

        };

    }

    handleOnLoad = () => {
        if (!authToken) {
            window.location.assign("/");
        }
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

        axios({
            method: 'post',
            url: 'https://api.artfully11.hasura-app.io/nomination-over',
            data: { eid: this.props.match.params.id },
            config: { headers: { 'Content-Type': 'application/json' } }
        })
            .then(response => {
                console.log(response.data);
                let res1 = response.data;
                axios({
                    method: 'post',
                    url: 'https://api.artfully11.hasura-app.io/nomination-start',
                    data: { eid: this.props.match.params.id },
                    config: { headers: { 'Content-Type': 'application/json' } }
                })
                    .then(response => {
                        console.log(response.data);
                        if (response.data === 1 && res1 === 0) {
                            this.setState({ nominationGoingOn: 1 });
                        }
                        else this.setState({ nominationGoingOn: 0 });


                    })
                    .catch(error => {
                        console.log('Post request to nomination start failed!');
                    });



            })
            .catch(error => {
                console.log('Post request to nomination over failed!');
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
                this.setState({ loading: true });
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
                        this.setState({ loading: false });
                        this.setState({ isDisabled: true });
                        this.setState({ successMsg: true });
                    })
                    .catch(error => {
                        this.setState({ loading: false });
                        this.setState({ isDisabled: true });
                        alert('Sorry! You cannot nominate yourself for this post!');
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
        if (this.state.successMsg) {
            alertSpan = <Alert
                message="Successfully Nominated!"
                description="You have successfully nominated yourself for this post."
                type="success"
                showIcon
            />;

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
                {(this.state.nominationGoingOn === 1) && <div>
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
                            <Button type="primary" htmlType="submit" disabled={this.state.isDisabled} loading={this.state.loading}>
                                Submit Nomination
                        </Button>
                        </FormItem>



                    </Form>
                    <div style={styles.msg}>
                        <div style={{ width: '50%' }}>
                            {alertSpan}
                        </div>
                    </div>
                </div> }
                
                {(this.state.nominationGoingOn === 0) &&
                <div>
                
                        <Alert style={{textAlign: "center", width: '80%', margin: "0 auto",marginTop: "10px" }}
                        message="Sorry, you cannot nominate yourself for this post right now!"
                        description="The nomination process for this post is not going on right now."
                        type="error"
                        showIcon
                    />
                </div>}
            </div>
        );
    }
}

const styles={
  msg:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
}

const NominateYourself = Form.create()(NominateYourselfForm);

export default NominateYourself;
//TODO: Ask Sai to remove primary key in nomination table so that one person can nominate himself/herself in multiple posts