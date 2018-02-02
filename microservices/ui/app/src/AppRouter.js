import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import { Data } from './Data';
import { AuthLogin } from './AuthLogin';
import { AuthRegister } from './AuthRegister';
import { Filestore } from './Filestore';
import Welcome from './Welcome'
import GetCredentials from './GetCredentials';
import ShowElection from './ShowElection';
import NotFoundPage from './NotFoundPage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class AppRouter extends React.Component {

  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Welcome}/>
            <Route exact path="/data" component={Data}/>
            <Route exact path="/auth-login" component={AuthLogin}/>
            <Route exact path="/auth-register" component={AuthRegister}/>
            <Route exact path="/filestore" component={Filestore}/>
            <Route exact path="/home" component={Home} />
            <Route exact path="/get-credentials" component={GetCredentials} />
            <Route path="/election/:id" component={ShowElection} />

            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default AppRouter;
