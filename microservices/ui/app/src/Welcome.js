import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './Welcome.css';
import { Carousel , Button } from 'antd';

class Welcome extends Component
{
  render()
  {
    return(
      <div style={styles.container}>
        <img src='https://api.artfully11.hasura-app.io/logo' />
        <h1 style={styles.header}>E-Election</h1>
        <div style={styles.body}>
          <div>
            <h1 style={styles.text}>
            Tired of standing in voting queues?
            <br />
            Use our E-Election app
            <br />
            <Button type="primary" href="/auth-login" size="large" style={{width:'200px'}}>LOGIN TO VOTE</Button>
            </h1>
          </div>
          <div style={{width:"35%" , border:'3px solid'}}>
          <Carousel autoplay>
           <div><img style={styles.image} src="http://www.livemint.com/rf/Image-621x414/LiveMint/WebArchive/BP/Photos/2015-11-07/Processed/Mint/Web/biharpolls1-kMIG--621x414@LiveMint.jpg"/></div>
           <div><img style={styles.image} src="http://s3.india.com/wp-content/uploads/2014/05/voters.jpg"/></div>
           <div><img style={styles.image} src="https://i0.wp.com/thewire.in/wp-content/uploads/2017/06/EVM-pti.jpg?ssl=1"/></div>
           <div><img style={styles.image} src="http://st1.bgr.in/wp-content/uploads/2014/04/india-elections-2014.jpg"/></div>
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
    background: 'linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url("http://s.wionews.com/photos/screen%20shot%202017-04-13%20at%206.51.16%20pm-20170413012157-1170x645.png")',
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
