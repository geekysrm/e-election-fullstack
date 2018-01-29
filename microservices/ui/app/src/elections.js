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
          {/*var card = ``;
          for(var i=0;i<response.data.length;i++)
          {

              card = card +`<Card title=response.data[i].id extra={<a href="#">More</a>} style={{ width: 300 }}>
                <p>{response.data[i].post}</p>
                <p>{response.data[i].state}</p>
                <p>{response.data[i].nomination_start_time}</p>
                <p>{response.data[i].nomination_end_time}</p>
                <p>{response.data[i].election_start_time}</p>
                <p>{response.data[i].election_end_time}</p>
              </Card>`

          }
          return card;*/}
          return (<Card title={response.data[0].id} extra={<a href="#">More</a>} style={{ width: 300 }}>
            <p>{response.data[0].post}</p>
            <p>{response.data[0].state}</p>
            <p>{response.data[0].nomination_start_time}</p>
            <p>{response.data[0].nomination_end_time}</p>
            <p>{response.data[0].election_start_time}</p>
            <p>{response.data[0].election_end_time}</p>
          </Card>)
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
            {this.loadCards()}
          </div>
      );
  }
}

export default elections;
