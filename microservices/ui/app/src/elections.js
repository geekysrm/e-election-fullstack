import React, { Component } from 'react';
import axios from 'axios';
import { Card } from 'antd';
import { getSavedToken } from './config';
const authToken = getSavedToken();

class Elections extends Component
{

  renderCard = (data) => {
    return( <h1>{data.state}</h1> )
  }

  loadCards = () =>{

    axios({
        method: 'post',
        url: 'https://api.artfully11.hasura-app.io/get-elections',
        config: { headers: { 'Content-Type': 'application/json' } }
    })
        .then(function (response) {
            console.log('Successful post request');
            console.log(response);
            /*console.log(response.data);
            console.log(response.data[0]);
            console.log(response.data[0].state);*/
            //var x = `<h1>hello world</h1>`;
            for(var i=0;i<response.data.length;i++)
            {
                console.log("hello");
            }
            return (<h1>hello world</h1>);
        })
        .catch(function (response) {
          console.log('UnSuccessful post request');
          console.log(response);
        });

{/*    axios({
        method: 'post',
        url: 'https://api.artfully11.hasura-app.io/get-elections',                                           //URL to be modified here
        config: { headers: { 'Content-Type': 'application/json' } }
    })
        .then(function (response) {console.log("hello");
          for(var i=0;i<response.data.length;i++)
          {
              <Card title=response.data[i].id extra={<a href="#">More</a>} style={{ width: 300 }}>
                <p>{response.data[i].post}</p>
                <p>{response.data[i].state}</p>
                <p>{response.data[i].nomination_start_time}</p>
                <p>{response.data[i].nomination_end_time}</p>
                <p>{response.data[i].election_start_time}</p>
                <p>{response.data[i].election_end_time}</p>
              </Card>
          }
          console.log(response);
          //return(<h1>hello</h1>);
        })
        .catch(function (response) {console.log("helloc");
          console.log(response);
          //return(<h1>hello</h1>);
        });*/}
  }
  constructor()
  {
    super();
  }

  render() {
      return (
          <div className="elections">
            {this.loadCards()}
          </div>
      );
  }
}

export default Elections;
