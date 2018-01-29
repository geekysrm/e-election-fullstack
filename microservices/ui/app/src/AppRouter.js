import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import { Data } from './Data';
import { Auth } from './Auth';
import { Filestore } from './Filestore';
import GetCredentials from './GetCredentials';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class AppRouter extends React.Component {

  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div>
            <Route exact path="/" render={() =>
                <div>
                  <h3>Welcome to E-Election</h3>
                </div>
              }/>
            <Route exact path="/data" component={Data}/>
            <Route exact path="/auth" component={Auth}/>
            <Route exact path="/filestore" component={Filestore}/>
            <Route exact path="/home" component={Home} />
            <Route exact path="/get-credentials" component={GetCredentials} />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default AppRouter;
