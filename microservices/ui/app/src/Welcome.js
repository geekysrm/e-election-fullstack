import React, { Component } from 'react';

class Welcome extends Component
{
  render()
  {
    return(
      <div>
        <h1 style={styles.header}>E-Election</h1>
      </div>
    );
  }
}

const styles = {
  header:{
    textAlign:"center",
  }
}

export default Welcome;
