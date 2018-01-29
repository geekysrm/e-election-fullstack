import React, { Component } from 'react';
import { deleteToken, getSavedToken } from './config';
import { Button } from 'antd';
import 'antd/dist/antd.css';



class Logout extends React.Component {

    onLogout = () => {


        console.log('CLicked logout');
        const authToken = getSavedToken();
        if(authToken)
        {
            deleteToken();
        }
        else {
            alert('Please login at /auth first');
        }
        
    }

    render() {

        return (
            <div>
                <Button type="primary" onClick={this.onLogout}>Logout</Button>

            </div>
        )
    }
}

export {
    Logout
};