import React, { Component } from 'react';
import { Button } from 'antd';
import axios from 'axios';
import Elections from './elections.js';
import { getSavedToken, deleteToken } from './config';
import 'antd/dist/antd.css';
import elections from './elections.js';
const authToken = getSavedToken();
class Home extends Component {

    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         // selectedTable: '',
    //         // selectedColumns: [],
    //         // tables: [],
    //         // columns: [],
    //         // tableData: [],
    //         // auth: 'Basic ' + btoa(props.user + ':' + props.pass),
    //     };

    //     // this.onTableChange = this.onTableChange.bind(this);
    //     // this.onColumnChange = this.onColumnChange.bind(this);
    //     // this.renderTableHeaders = this.renderTableHeaders.bind(this);
    //     // this.renderTableBody = this.renderTableBody.bind(this);
    //     // this.getColumnList = this.getColumnList.bind(this);
    //     // this.getData = this.getData.bind(this);

    // }

    componentDidMount()
    {
        axios({
            method: 'post',
            url: 'https://api.artfully11.hasura-app.io/get-elections',
           
            config: { headers: { 'Content-Type': 'application/json' } }
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
               alert(`Sorry, can't fetch elections right now!`);
               console.log('Post request failed!');
            });
    }


    onLogout = () => {


        console.log('CLicked logout');
        const authToken = getSavedToken();
        if (authToken) {
            deleteToken();
        }
        else {
            alert('Please login at /auth first');
        }

    }

    getData = () => {


                console.log('Clicked getdata');

                axios({
                    method: 'post',
                    url: 'https://api.artfully11.hasura-app.io/data',                                           //URL to be modified here
                    data: { auth: authToken },
                    config: { headers: { 'Content-Type': 'application/json' } }
                })
                    .then(function (response) {
                      console.log(response.data.hasura_id);
                      const id = response.data.hasura_id;
                    })
                    .catch(function (response) {
                      console.log("post req failed");
                    });
    }

    render() {
        return (
            <div className="App">
                <h1>Home Page</h1>
                <div>
                    <Button type="primary" href="/get-credentials">Get Credentials</Button>
                    <Button type="primary" onClick={this.getData}>Data</Button>
                    <Button type="primary" onClick={this.onLogout}>Logout</Button>
                </div>
                <div>

                </div>
                <Elections />
            </div>
        );
    }
}

export default Home;
