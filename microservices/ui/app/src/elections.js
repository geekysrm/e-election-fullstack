import React, { Component } from 'react';
import axios from 'axios';
import { Card } from 'antd';
import { getSavedToken } from './config';
const authToken = getSavedToken();

class elections extends Component
{
  loadCards = () =>{
    axios({
        method: 'post',
        url: 'https://api.artfully11.hasura-app.io/get-elections',                                           //URL to be modified here
        config: { headers: { 'Content-Type': 'application/json' } }
    })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (response) {
          console.log(response);
        });
  }
  constructor()
  {
    super();
    this.loadCards();
  }

  render() {
      return (
          <div className="elections">
          <Card title="Card title" extra={<a href="#">More</a>} style={{ width: 300 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          </div>
      );
  }
}

export default elections;
