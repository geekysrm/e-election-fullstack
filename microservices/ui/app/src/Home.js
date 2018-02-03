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
            window.location.assign('/');
        }

    }

//Add Ant.Design components like lists etc. below
    render() {
        return (
            <div className="App">

              <div style={styles.side}>
                <h1 style={{color:'white' , fontFamily: 'Acme', fontSize: 50}}>E-Election</h1>
                <nav style={{display:'block'}}>
                  <ul style={{listStyle:'none'}}>
                    <li style={styles.link}><a className='anow' href="/home">Home</a></li>

                    {this.state.elections.map(function(election){
                      return(
                        <li style={styles.link}>
                        <a className='a' href={`/election/${election.election_id}`}>
                        {election.state} state {election.post} elections
                        </a>
                        </li>
                      );
                    })}

                    <li style={styles.link}><a className='a' href="/get-credentials">Get Credentials</a></li>
                    <li style={styles.link}><a className='a' href="#">About</a></li>
                    <li style={styles.link}><a className='a' href="#" onClick={this.onLogout}>Logout</a></li>
                  </ul>
                </nav>
              </div>

              <div style={styles.content}>
                <div style={styles.cardContainer}>
                <div>
                        {this.state.elections.map(function (election) {
                          var nsd = election.nomination_start_time.split('T')[0];
                          var ned = election.nomination_end_time.split('T')[0];
                          var esd = election.election_start_time.split('T')[0];
                          var eed = election.election_end_time.split('T')[0];

                          var nst = election.nomination_start_time.split('T')[1].split('+')[0] + " hrs";
                          var net = election.nomination_end_time.split('T')[1].split('+')[0] + " hrs";
                          var est = election.election_start_time.split('T')[1].split('+')[0] + " hrs";
                          var eet = election.election_end_time.split('T')[1].split('+')[0] + " hrs";


                            return (
                              <div style={{ background: '#ECECEC', padding: '30px' , width: 610 , marginLeft: 20 }}>
                                <Card title={<b>{election.state} state {election.post} elections</b>}
                                  extra={<a href={`/election/${election.election_id}`}>View Details</a>} style={{ width: 550 , fontWeight:'bold' }}
                                >
                                    <br />
                                    <p>Election State: {election.state}</p>
                                    <p>Election Post: {election.post}</p>
                                    <p>Nomination Start Time: {nsd+" , "+nst}</p>
                                    <p>Nomination End Time: {ned+" , "+net}</p>
                                    <p>Election Start Time: {esd+" , "+est}</p>
                                    <p>Election End Time: {eed+" , "+eet}</p>

                                </Card>
                                <br />
                                <br />
                              </div>
                            );
                        })}
                </div>
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
  	width:'25%',
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
  	marginLeft: '30%',
  	width:'65%'
  },
  link:{
    lineHeight:'50px',
    fontFamily:'Raleway',
  },
  cardContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
}

export default Home;
