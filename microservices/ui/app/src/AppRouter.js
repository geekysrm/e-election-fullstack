import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import { Data } from './Data';
import { Auth } from './temp';
import { Auth1 } from './Auth';
import { Filestore } from './Filestore';
import GetCredentials from './GetCredentials';
//import ShowElection from './ShowElection';
import NotFoundPage from './NotFoundPage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class AppRouter extends React.Component {

  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <Switch>
            <Route exact path="/" render={() =>
                <div>
                  <h3>Welcome to E-Election</h3>
                </div>
              }/>
            <Route exact path="/data" component={Data}/>
            <Route exact path="/auth" component={Auth}/>
            <Route exact path="/auth1" component={Auth1}/>
            <Route exact path="/filestore" component={Filestore}/>
            <Route exact path="/home" component={Home} />
            <Route exact path="/get-credentials" component={GetCredentials} />
            <Route path="/election/:id" component={GetCredentials} />

            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default AppRouter;
