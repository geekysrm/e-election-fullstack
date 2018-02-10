import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Divider, Checkbox, Button, AutoComplete, DatePicker, Alert, Modal } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import 'antd/dist/antd.css';


import { getSavedToken } from './config';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const { MonthPicker, RangePicker } = DatePicker;

// const states = [{
//     value: 'Andaman and Nicobar Islands',
//     label: 'Andaman and Nicobar Islands',

// },
// {
//     value: 'Andhra Pradesh',
//     label: 'Andhra Pradesh',

// }, {
//     value: 'Arunachal Pradesh',
//     label: 'Arunachal Pradesh',

// }, {
//     value: 'Assam',
//     label: 'Assam',

// }, {
//     value: 'Bihar',
//     label: 'Bihar',

// }, {
//     value: 'Chandigarh',
//     label: 'Chandigarh',

// }, {
//     value: 'Chhattisgarh',
//     label: 'Chhattisgarh',

// }, {
//     value: 'Dadra and Nagar Haveli',
//     label: 'Dadra and Nagar Haveli',

// },
// {
//     value: 'Daman and Diu',
//     label: 'Daman and Diu',

// },
// {
//     value: 'National Capital Territory of Delhi',
//     label: 'National Capital Territory of Delhi',

// }, {
//     value: 'Goa',
//     label: 'Goa',

// }, {
//     value: 'Gujarat',
//     label: 'Gujarat',

// }, {
//     value: 'Haryana',
//     label: 'Haryana',

// }, {
//     value: 'Himachal Pradesh',
//     label: 'Himachal Pradesh',

// }, {
//     value: 'Jammu and Kashmir',
//     label: 'Jammu and Kashmir',

// }, {
//     value: 'Jharkhand',
//     label: 'Jharkhand',

// }, {
//     value: 'Karnataka',
//     label: 'Karnataka',

// }, {
//     value: 'Kerala',
//     label: 'Kerala',

// }, {
//     value: 'Lakshadweep',
//     label: 'Lakshadweep',

// }, {
//     value: 'Madhya Pradesh',
//     label: 'Madhya Pradesh',

// }, {
//     value: 'Maharashtra',
//     label: 'Maharashtra',

// }, {
//     value: 'Manipur',
//     label: 'Manipur',

// }, {
//     value: 'Meghalaya',
//     label: 'Meghalaya',

// }, {
//     value: 'Mizoram',
//     label: 'Mizoram',

// }, {
//     value: 'Nagaland',
//     label: 'Nagaland',

// }, {
//     value: 'Odisha',
//     label: 'Odisha',

// }, {
//     value: 'Puducherry',
//     label: 'Puducherry',

// }, {
//     value: 'Punjab',
//     label: 'Punjab',

// }, {
//     value: 'Rajasthan',
//     label: 'Rajasthan',

// }, {
//     value: 'Sikkim',
//     label: 'Sikkim',

// }, {
//     value: 'Tamil Nadu',
//     label: 'Tamil Nadu',

// }, {
//     value: 'Telangana',
//     label: 'Telangana',

// }, {
//     value: 'Tripura',
//     label: 'Tripura',

// }, {
//     value: 'Uttar Pradesh',
//     label: 'Uttar Pradesh',

// }, {
//     value: 'Uttarakhand',
//     label: 'Uttarakhand',

// }, {
//     value: 'West Bengal',
//     label: 'West Bengal',

// }];

const gender = [{
    value: 'Male',
    label: 'Male',

}, {
    value: 'Female',
    label: 'Female',

},
{
    value: 'Others',
    label: 'Others',

}];

//states == constituencies

const states = [{
    value: 'Chandni Chowk',
    label: 'Chandni Chowk',

},
{
    value: 'Delhi Cantonment',
    label: 'Delhi Cantonment',

}, {
    value: 'Malviya Nagar',
    label: 'Malviya Nagar',

}];

const authToken = getSavedToken();
class CredentialsForm extends React.Component {
    constructor(props)
    {

        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            credentialsThere: '',
            loading: false,
            isDisabled: false,
            copied: false,
            flag:-1,
            details:[]
        };

    }

    handleOnLoad = () => {
        if (!authToken) {
            window.location.assign("/");
        }
        var this1 = this;

        axios({
            method: 'post',
            url: 'https://api.' + process.env.REACT_APP_CLUSTER_NAME +'.hasura-app.io/data',                                           //URL to be modified here
            data: { auth: authToken },
            config: { headers: { 'Content-Type': 'application/json' } }
        })
            .then(function (response) {
                console.log(response.data.hasura_id);
                const id = response.data.hasura_id;
                var this2 = this1;
                axios({
                    method: 'post',
                    url: 'https://api.'+process.env.REACT_APP_CLUSTER_NAME+'.hasura-app.io/check-credentials',
                    data: {
                        serial: id
                    },
                    config: { headers: { 'Content-Type': 'application/json' } }
                })
                    .then(function (response) {
                        console.log('Successful post request');
                        console.log(response.data);

                            if(response.data===1)
                            this2.setState({ flag: 1 });
                        if (response.data === 0)
                        {
                            this2.setState({ flag: 0 });
                            var this3=this2;
                        axios({
                            method: 'post',
                            url: 'https://api.' + process.env.REACT_APP_CLUSTER_NAME +'.hasura-app.io/view-credentials',                                           //URL to be modified here
                            data: { serial: id },
                            config: { headers: { 'Content-Type': 'application/json' } }
                        })
                            .then(function (response) {
                                console.log(response.data);
                                var arr = Object.values(response.data[0]);
                                this3.setState({ details: arr });
                                console.log(this3.state.details);

                               //TODO: Give loading screen when data is being loaded for viewing credentials





                            })
                            .catch(function (response) {
                                console.log("post req 3 failed");
                            });
                        }


                    })
                    .catch(function (response) {
                        console.log('Unsuccessful post request');
                        console.log(response);
                        alert('Sorry, Server Error!');

                    });
            })
            .catch(function (response) {
                console.log("post req failed");
                alert('Sorry, Server Error!');
            });
    }

    componentWillMount()
    {
        window.addEventListener('load', this.handleOnLoad);
    }
    componentDidUpdate()
    {
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
                const nowDate = moment();
                var dateMoment = moment(values.date);
                var dateGot = dateMoment.format("YYYY-MM-DD");
                var age = nowDate.diff(dateGot, 'years');
                console.log(age);
                var that = this;
                if (age >= 18) {
                    axios({
                        method: 'post',
                        url: 'https://api.' + process.env.REACT_APP_CLUSTER_NAME+'.hasura-app.io/data',                                           //URL to be modified here
                        data: { auth: authToken },
                        config: { headers: { 'Content-Type': 'application/json' } }
                    })
                        .then(function (response) {
                            console.log(response.data.hasura_id);
                            const id = response.data.hasura_id;
                            var that1 = that;
                            axios({
                                method: 'post',
                                url: 'https://api.' + process.env.REACT_APP_CLUSTER_NAME +'.hasura-app.io/get-credentials',
                                data: {
                                    serial: id,
                                    name: values.name,
                                    gender: values.gender[0],
                                    date: dateGot,
                                    state: values.states[0],
                                    voterId: values.voterId,
                                    email: values.email,
                                    phone: Number(values.phone)
                                },
                                config: { headers: { 'Content-Type': 'application/json' } }
                            })
                                .then(function (response) {
                                    console.log('Successful post request');
                                    console.log(response.data);
                                    //TODO: Display credentials got from response in a copiable span
                                    that1.setState({ credentialsThere: response.data });
                                    that1.setState({ loading: false });
                                    that1.setState({ isDisabled: true });
                                })
                                .catch(function (response) {
                                    this.setState({ loading: false });
                                    this.setState({ isDisabled: true });
                                    console.log('Unsuccessful post request');
                                    console.log(response);
                                    alert('Sorry, Server Error!');

                                });




                        })
                        .catch(function (response) {
                            console.log("post req failed");
                        });
                }
                else {
                    Modal.error({
                        title: 'Please enter correct DOB!',
                        content: 'You have to be above 18 years to vote!',
                    });
                    that.setState({ loading: false });
                }

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
                {(this.state.flag === 1) && (<div>
                  <h1 style={{marginTop:"10px" , textAlign:"center"}}>Register To Get Credentials</h1>
                  <Divider />
                    <Form onSubmit={this.handleSubmit} style={{ marginRight:"20%" ,
                          marginLeft:"5%",
                          marginTop:"20px"}}>
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
                            label="Constituency"
                        >
                            {getFieldDecorator('states', {
                                initialValue: ['Chandni Chowk'],
                                rules: [{ type: 'array', required: true, message: 'Please select your constituency!' }],
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
                            <Button type="primary" htmlType="submit" disabled={this.state.isDisabled} loading={this.state.loading}>
                                Get Voting Credentials
                        </Button>
                        </FormItem>

                        {/*
                    TO DO: Add agree to agreement


                <FormItem {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                        )}
                </FormItem>

                    */}

                        {
                            /*
                            TO DO: Add photo upload
                                &
                            Check for >=18 years
                                &
                            Display get credentials
                            */
                        }
                    </Form>
                    <div style={styles.msg}>
                      <div style={{width:'50%'}}>
                      {alertSpan}
                      {copiedSpan}
                      </div>
                    </div>
                </div>)}
                {(this.state.flag === 0) && (
                    <div>
                    <h1 style={{marginTop:"10px" , textAlign:"center"}}>Personal Details and Credentials</h1>
                    <Divider />
                        <div style={{ marginRight:"20%",
                              marginLeft:"10%",
                              marginTop:"20px"}}>
                        <span>Full Name</span>
                        <Input value={this.state.details[8]} style={{ color: 'black', cursor: 'pointer' }} disabled={true} />
                        <br />
                        <br />
                        <span>Gender</span>
                        <Input value={this.state.details[7]} style={{ color: 'black', cursor: 'pointer' }} disabled={true} />
                        <br />
                        <br />
                        <span>Date of Birth</span>
                        <Input value={this.state.details[6]} style={{ color: 'black', cursor: 'pointer' }} disabled={true} />
                        <br />
                        <br />
                        <span>Constituency</span>
                        <Input value={this.state.details[2]} style={{ color: 'black', cursor: 'pointer' }} disabled={true} />
                        <br />
                        <br />
                        <span>Voter ID Number</span>
                        <Input value={this.state.details[4]} style={{ color: 'black', cursor: 'pointer' }} disabled={true} />
                        <br />
                        <br />
                        <span>E-mail</span>
                        <Input value={this.state.details[0]} style={{ color: 'black', cursor: 'pointer' }} disabled={true} />
                        <br />
                        <br />
                        <span>Phone</span>
                        <Input value={this.state.details[1]} style={{ color: 'black', cursor: 'pointer' }} disabled={true} />
                        <br />
                        <br />
                        <span>Voting Credentials</span>

                        <Alert
                            description={

                                <CopyToClipboard onCopy={this.onCopy} text={this.state.details[3]}>
                                    <span style={{ cursor: 'pointer' }}><strong>{this.state.details[3]}</strong></span>
                                </CopyToClipboard>

                            }

                        />
                        {copiedSpan}

                        <br />
                        <br />
                        </div>
                    </div>

                )}

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

const GetCredentials = Form.create()(CredentialsForm);

export default GetCredentials;
