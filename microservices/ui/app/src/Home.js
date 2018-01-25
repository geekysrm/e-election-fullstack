import React, { Component } from 'react';
import { Button } from 'antd';
import axios from 'axios';
import { getSavedToken , saveId } from './config';
import 'antd/dist/antd.css';
const authToken = getSavedToken();
class Home extends Component {
    getData = () => {


                console.log('CLicked getdata');
/*
                axios({
                    method: 'post',
                    url: 'https://api.artfully11.hasura-app.io/data',                                           //URL to be modified here
                    data: { auth: authToken },
                    config: { headers: { 'Content-Type': 'application/json' } }
                })
                    .then(function (response) {
                      console.log(response.data.hasura_id);
                      saveId(response.data.hasura_id);
                    })
                    .catch(function (response) {
                      console.log(response.data.hasura_id);
                      console.log("post req failed");
                    });
*/

        var request = new XMLHttpRequest();

        request.onreadystatechange = function(){
          if(request.readyState === XMLHttpRequest.DONE)
          {
            if(request.status === 200)
            {
              console.log(request.responseText);
              var x = JSON.parse(request.responseText);
              saveId(x.hausra_id);
              alert(x.hausra_id);
            }
            else if(request.status === 401)
            {
              alert("failed");
            }
            else if(request.status === 500)
            {
              alert("failed");
            }
          }
        };

        request.open('POST','https://api.artfully11.hasura-app.io/data',true);
        request.setRequestHeader('Content-Type','application/json');
        request.send(JSON.stringify({'auth':authToken}));
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
