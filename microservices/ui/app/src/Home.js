import React, { Component } from 'react';
import { Button } from 'antd';
import { getSavedToken } from './config';
import 'antd/dist/antd.css';
const authToken = getSavedToken();
class Home extends Component {
    getData = () => {


                console.log('CLicked getdata');

                axios({
                    method: 'post',
                    url: 'https://api.artfully11.hasura-app.io/data',                                           //URL to be modified here
                    data: { auth: authToken },
                    config: { headers: { 'Content-Type': 'application/json' } }
                })
                    .then(function (response) {
                        console.log('Successful post request');
                        console.log(response);
                        //TODO: Display credentials got from response in a copiable span

                    })
                    .catch(function (response) {
                        console.log('Unsuccessful post request');
                        console.log(response);
                        alert('Sorry, Server Error!');

                    });


    }

    render() {
        return (
            <div className="App">
                <h1>Home Page</h1>
                <div>
                    <Button type="primary" href="/get-credentials">Get Credentials</Button>
                    <Button type="primary" onClick={this.getData}>Data</Button>
                </div>
            </div>
        );
    }
}

export default Home;
