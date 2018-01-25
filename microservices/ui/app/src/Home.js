import React, { Component } from 'react';
import { Button } from 'antd';
import './Home.css';
import 'antd/dist/antd.css';

class Home extends Component {
    render() {
        return (
            <div className="App">
                <h1>Home Page</h1>
                <div>
                    <Button type="primary" href="/get-credentials">Get Credentials</Button>

                </div>
            </div>
        );
    }
}

export default Home;
