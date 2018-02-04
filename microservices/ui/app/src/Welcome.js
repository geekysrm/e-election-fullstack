import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './Welcome.css';
import { Carousel , Button } from 'antd';
import { getSavedToken } from './config';


class Welcome extends Component
{
  constructor(props) {
    super(props);

    this.state = {
     loggedIn: false
    };
  }

  componentWillMount() {
    const authToken = getSavedToken();
    if(authToken)
    {
      this.setState({ loggedIn: true });
    }
    else this.setState({ loggedIn: false });

  }

  render()
  {
    return(
      <div style={styles.container}>
        <h1 style={styles.header}>E-Election</h1>
        <div style={styles.body}>
          <div>
            <h1 style={styles.text}>
            Tired of standing in voting queues?
            <br />
            Use our E-Election app
            <br />
              {!this.state.loggedIn ? <Button type="primary" href="/auth-login" size="large" style={{ width: '200px' }}>LOGIN TO VOTE</Button> : <Button type="primary" href="/home" size="large" style={{ width: '200px' }}>GO TO DASHBOARD</Button>}
            </h1>
          </div>
          <div style={{width:"35%" , border:'3px solid'}}>
          <Carousel autoplay>
           <div><img style={styles.image} src="https://api.artfully11.hasura-app.io/img1"/></div>
           <div><img style={styles.image} src="https://api.artfully11.hasura-app.io/img2"/></div>
           <div><img style={styles.image} src="https://api.artfully11.hasura-app.io/img3"/></div>
           <div><img style={styles.image} src="https://api.artfully11.hasura-app.io/img4"/></div>
          </Carousel>
          </div>
        </div>
        <br />
        <h1 style={styles.text1}>&quot;Have a Vision? Make the Right Decision! VOTE!&quot;</h1>
        <br /><br /><br />
        <footer style={{background:'#222222' , position:'absolute' , marginBottom:'0' , width:'100%'}}>
          <a href="/about"><h1 style={styles.text2}>About</h1></a>
          <h1 style={styles.text2}>&copy;2018 E-Election App · All rights reserved</h1>
        </footer>

        <link href="https://fonts.googleapis.com/css?family=Acme" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Nunito:700" rel="stylesheet" />
      </div>
    );
  }
}

const styles = {
  header:{
    textAlign:"center",
    fontFamily: 'Acme',
    fontSize: 60,
    color:'white'
  },
  text:{
    color:'white',
    fontFamily: 'Nunito',
    fontSize: 40,
  },
  body:{
    width:'100%',
    height:'600px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  container:{
    background: 'linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url("https://api.artfully11.hasura-app.io/background")',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    height: '100%',
    width:'100%',
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  },
  image:{
    height:'300px',
    width:'100%'
  },
  text1:{
    color:'white',
    fontFamily: 'Nunito',
    fontSize: 40,
    textAlign:'center'
  },
  text2:{
    color:'white',
    fontFamily: 'Nunito',
    fontSize: 20,
    textAlign:'center'
  }
}

export default Welcome;

//Ask Sai to add shadow effect on heading E-Election

//TODO: Restore default conf/domains.yaml from other hasura project folders
