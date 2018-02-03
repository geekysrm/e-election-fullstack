import React, { Component } from 'react';
import { Button , Card } from 'antd';
import axios from 'axios';
import { getSavedToken, deleteToken } from './config';
import 'antd/dist/antd.css';
import './Home.css';

const authToken = getSavedToken();
class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            elections: []
        };

    }

    componentWillMount()
    {
        axios({
            method: 'post',
            url: 'https://api.artfully11.hasura-app.io/get-elections',

            config: { headers: { 'Content-Type': 'application/json' } }
        })
            .then(response => {
                console.log(response.data);




                this.setState({ elections: response.data });
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
            window.location.assign('/');
        }
        else {
            alert('Please login at /auth-login first');
        }

    }

//Add Ant.Design components like lists etc. below
    render() {
        return (
            <div className="App">

              <div style={styles.side}>
                <h1 style={{color:'white' , fontFamily: 'Acme', fontSize: 60}}>E-Election</h1>
                <nav style={{display:'block'}}>
                  <ul style={{listStyle:'none'}}>
                    <li style={styles.link}><a className='a' href="/get-credentials">Get Credentials</a></li>
                    <li style={styles.link}><a className='a' href="#" onClick={this.onLogout}>Logout</a></li>
                    <li style={styles.link}><a className='a' href="#">About</a></li>
                  </ul>
                </nav>
              </div>

              <div style={styles.content}>
              <div>
                      {this.state.elections.map(function (election) {
                          return (
                            <div style={{ background: '#ECECEC', padding: '30px' , width: 560 , marginLeft: 20 }}>
                              <Card title={`${election.state} state ${election.post} elections`}
                                extra={<a href={`/election/${election.election_id}`}>View Details</a>} style={{ width: 500 }}
                              >
                                  <br />
                                  <p>Election State: {election.state}</p>
                                  <p>Election Post: {election.post}</p>
                                  <p>Nomination Start Time: {election.nomination_start_time}</p>
                                  <p>Nomination End Time: {election.nomination_end_time}</p>
                                  <p>Election Start Time: {election.election_start_time}</p>
                                  <p>Election End Time: {election.election_end_time}</p>

                              </Card>
                              <br />
                              <br />
                            </div>
                          );
                      })}
              </div>
              </div>

              <link href="https://fonts.googleapis.com/css?family=Acme" rel="stylesheet" />
              <link href="https://fonts.googleapis.com/css?family=Raleway:600" rel="stylesheet" />
            </div>
        );
    }
}

const styles={
  side:{
    float:'left',
  	width:'30%',
  	paddingTop:'30px',
  	paddingLeft:'25px',
  	top:0,
  	bottom:0,
    position:'fixed',
  	backgroundColor:'#474958',
  	zIndex:400
  },
  content:{
    float:'left',
  	marginLeft: '35%',
  	width:'60%'
  },
  link:{
    lineHeight:'50px',
    fontFamily:'Raleway',
  }
}

export default Home;
