import React from 'react';
import { Divider } from 'antd';
import axios from 'axios';
import { getSavedToken, deleteToken } from './config';
import './About.css';

const authToken = getSavedToken();
class About extends React.Component
{

  constructor(props) {
      super(props);
      this.state = {
          credentialsThere: false,
          hasura_id: -1
      };
  }

  componentWillMount()
  {

    axios({
      method: 'post',
      url: 'https://api.artfully11.hasura-app.io/data',
      data: { auth: authToken },
      config: { headers: { 'Content-Type': 'application/json' } }
    })
      .then(response => {
        console.log(response.data.hasura_id);
        this.setState({ hasura_id: response.data.hasura_id });

        axios({
          method: 'post',
          url: 'https://api.artfully11.hasura-app.io/check-credentials',
          data: { serial: this.state.hasura_id },
          config: { headers: { 'Content-Type': 'application/json' } }
        })
          .then(response => {
            console.log(response.data);
            if (response.data === 0) {
              this.setState({ credentialsThere: true });
            }
            else if (response.data === 1) {
              this.setState({ credentialsThere: false });
            }
          })
          .catch(error => {
            console.log('Post request to check for credentials failed!');
          });


      })

      .catch(error => {
        console.log('Post request to get hasura id failed!');
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

  render()
  {
    return (

      <div>
        <div style={styles.side}>
          <h1 style={{color:'white' , fontFamily: 'Acme', fontSize: 50}}>E-Election</h1>
          <nav style={{display:'block'}}>
            <ul style={{listStyle:'none'}}>
              <li style={styles.link}><a className='a' href="/home">Home</a></li>
              {this.state.credentialsThere ? <li style={styles.link}><a className='a' href="/get-credentials">View Credentials</a></li> : <li style={styles.link}><a className='a' href="/get-credentials">Get Credentials</a></li> }
              <li style={styles.link}><a className='anow'>About</a></li>
              <li style={styles.link}><a className='a' href="#" onClick={this.onLogout}>Logout</a></li>
            </ul>
          </nav>
        </div>

        <div style={styles.content}>
          <h1 style={{marginTop:"10px" , textAlign:"center" , fontSize:50}}>About Us</h1>
          <Divider />
          <h1>Introduction:</h1>
          <p style={styles.paragraph}>
            India is a constitutional democracy with a parliamentary system of government,
            and at the heart of the system is a commitment to hold regular, free and fair elections.
            These elections determine the composition of the government, the membership of the two
            houses of parliament, the state and union territory legislative assemblies, and the Presidency
            and vice-presidency.
          </p>
          <h1>Function:</h1>
          <p style={styles.paragraph}>
          E-Elections App is one stop for all the India election news, election results, information of all
          assembly candidates, constituencies and parties. You can search for your constituency and know about
          your election candidates and voter list online. Most importantly candidates will be talking about what
          is their agenda and their views.
          </p>
          <h1>Feature of E-Election App:</h1>
          <p style={styles.paragraph}>
          <li>Latest news from across India about state elections </li>
          <li>Vote appeal from the candidates</li>
          <li>List of candidates, constituencies, parties, voters with details</li>
          <li>Past results of state election in India</li>
          <li>Search for various constituencies, polling stations and candidates to get their details</li>
          </p>
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
  paragraph:{
    fontSize:20
  }
}

export default About;
