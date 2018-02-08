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
          <h1 style={{ color: 'white', fontFamily: 'Acme', fontSize: 50 }}><a className='a' style={{ color: 'white', fontFamily: 'Acme', fontSize: 50 }} href="/">E-Election</a></h1>
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
            India is the largest democracy in the world and houses ~1.3 Billion people. 
            But as statistics have shown, all Indians do not come forward to vote for their 
            leaders for some reason or the other like long election queues, election booth violence etc. 
            This must be removed for proper selection of leaders without any bias. 
          </p>
          <h1>How E-Election aims to improve Indian Elections:</h1>
          <p style={styles.paragraph}>
          E-election app will remove all these constraints and thereby people can vote anytime anywhere, without any inconvenience. 
          Apart from this, users of the app can nominate themselves for any post they want. 
          E-election aims to become an one-stop app for all general elections happening in the country.         
          </p>
          <h1>Feature of E-Election App:</h1>
          <p style={styles.paragraph}>
            <li>Users will be able to sign up/login. </li>
            <li>Admin user would be able to create new elections with deadlines( date+time) for nominations.</li>
            <li>Users would be able to nominate themselves as candidates for an election and upload a manifesto before the nomination deadline .</li>
            <li>Voters would be able to see a list of elections and check out the list of candidates along with their manifesto or any other details you want to include. Then the user would be able to cast a vote for one of them.</li>
            <li>After the deadline, the victor would be mentioned in the list of elections and the election considered inactive.</li>
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
