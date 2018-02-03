import React, { Component } from 'react';
import axios from 'axios';
import { Button, Input , Divider } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
import { getSavedToken } from './config';

const Search = Input.Search;
const authToken = getSavedToken();

class ShowElection extends Component {

    constructor(props) {
        super(props);

        this.state = {
            electionState: '',         //Store details of the particular election state in the page
            electionPost: '',
            nominations: [],
            nominee_names: [],
            nominee_ages: [],
            nominee_genders: [],
            textBoxShow: -1,
            voter_hasura_id: -1,
            voter_state: '',
            voter_credentials: '',
            voter_can_vote: 0,
            disableCastVoteButton: false        //disable the Cast Vote btn after clicking it once (not implemented)
        };



    }

    componentWillMount() {
        axios({
            method: 'post',
            url: 'https://api.artfully11.hasura-app.io/data',
            data: { auth: authToken },
            config: { headers: { 'Content-Type': 'application/json' } }
        })
            .then(response => {
                var voter_hasura_id_var = response.data.hasura_id;
                console.log(voter_hasura_id_var);
                this.setState({ voter_hasura_id: response.data.hasura_id });
                axios({
                    method: 'post',
                    url: 'https://api.artfully11.hasura-app.io/view-credentials',
                    data: { serial: voter_hasura_id_var },
                    config: { headers: { 'Content-Type': 'application/json' } }
                })
                    .then(response => {
                        this.setState({ voter_state: response.data[0].state });
                        this.setState({ voter_credentials: response.data[0].credentials });
                        console.log(response.data[0].state);
                        console.log(response.data[0].credentials);


                    })
                    .catch(error => {
                        console.log('Post request failed!');
                    });

            })
            .catch(error => {
                console.log('Post request to get voter hasura Id failed!');
            });

        axios({
            method: 'post',
            url: 'https://api.artfully11.hasura-app.io/get-election-data',
            data: { eid: this.props.match.params.id },
            config: { headers: { 'Content-Type': 'application/json' } }
        })
            .then(response => {
                console.log(response.data[0].state);
                this.setState({ electionState: response.data[0].state });
                this.setState({ electionPost: response.data[0].post });

            })
            .catch(error => {
                console.log('Post request failed!');
            });

        axios({
            method: 'post',
            url: 'https://api.artfully11.hasura-app.io/get-nominations',
            data: { eid: this.props.match.params.id },
            config: { headers: { 'Content-Type': 'application/json' } }
        })
            .then(response => {
                console.log(response.data);
                this.setState({ nominations: response.data });

                this.state.nominations.map((nomination) => {
                    axios({
                        method: 'post',
                        url: 'https://api.artfully11.hasura-app.io/view-credentials',
                        data: { serial: nomination.hasura_id },
                        config: { headers: { 'Content-Type': 'application/json' } }
                    })
                        .then(response => {

                            const nowDate = moment();
                            console.log(response.data[0].name);
                            console.log(response.data[0].gender);
                            this.setState({
                                nominee_names: this.state.nominee_names.concat(response.data[0].name)
                            });
                            this.setState({
                                nominee_genders: this.state.nominee_genders.concat(response.data[0].gender)
                            });
                            const dob = moment(response.data[0].dob, 'YYYY-MM-DD').toDate();
                            var age = nowDate.diff(dob, 'years');
                            this.setState({
                                nominee_ages: this.state.nominee_ages.concat(age.toString() + " years")
                            });

                        })
                        .catch(error => {
                            console.log('Post request failed!');
                        });
                })





            })
            .catch(error => {
                alert(`Sorry, can't fetch nominations list right now!`);
                console.log('Post request failed!');
            });


    }


    onVote = (id_of_candidate, eid) => {

        axios({
            method: 'post',
            url: 'https://api.artfully11.hasura-app.io/can-vote',
            data: { id: this.state.voter_hasura_id, eid: this.props.match.params.id  },
            config: { headers: { 'Content-Type': 'application/json' } }
        })
            .then(response => {
                if (response.data === 1 && this.state.electionState === this.state.voter_state)
                    this.setState({ textBoxShow: id_of_candidate });
                else if (this.state.electionState === this.state.voter_state && response.data === 0)
                    alert('You have already voted for this post!');
                else if (this.state.electionState!== this.state.voter_state)
                    alert('You cannot vote for this post as you do not belong to this state!');

            })
            .catch(error => {
                console.log('Post request failed!');
            });


    }

    onNominate = () => {
            window.location.assign(`/nominate/${this.props.match.params.id}`);


    }

    onCastVote = (id_of_candidate, eid, value) => {

        var credentials = value;
        var id_of_voter = -1;
        axios({
            method: 'post',
            url: 'https://api.artfully11.hasura-app.io/data',
            data: { auth: authToken },
            config: { headers: { 'Content-Type': 'application/json' } }
        })
            .then(response => {

                id_of_voter = response.data.hasura_id;
                console.log(id_of_voter);
                console.log("ID of candidate: " + id_of_candidate);
                console.log("Election ID: " + eid);
                console.log("Voting Creds: " + credentials);

                axios({
                    method: 'post',
                    url: 'https://api.artfully11.hasura-app.io/vote',
                    data: { id_of_candidate: id_of_candidate, id_of_voter: id_of_voter, eid: eid, credentials: credentials },
                    config: { headers: { 'Content-Type': 'application/json' } }
                })
                    .then(response => {
                        console.log(response.data);
                        if(response.data === 0)
                        {
                            alert('Please enter correct credentials!');
                        }
                        else if(response.data === 1)
                        {
                            alert('Successfully voted!');
                            this.setState({disableCastVoteButton: true });


                        }


                    })
                    .catch(error => {
                        alert('Sorry, you cannot vote right now!');
                        console.log('Post request to vote failed!');
                    });


            })
            .catch(error => {
                console.log('Post request to get voter hasura Id failed!');
            });



    }



    render() {
        return (
          <div>

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
                  <h1 style={{marginTop:"10px" , textAlign:"center"}}>{this.state.electionState} state {this.state.electionPost} elections</h1>
                  <Divider />
                  <div style={styles.header}>
                    <p>Current Nominations - </p>
                    <Button type="primary" onClick={this.onNominate}>Nominate Yourself</Button>
                  </div>
                  <div>

                      <ol>

                          {this.state.nominations.map((nomination, index) => {
                              return (


                                  <li key={nomination.hasura_id}>

                                      <ul>
                                          <li key={nomination.hasura_id}>

                                              <li key={this.state.nominee_names[index]}>Name: {this.state.nominee_names[index]}</li>
                                              <li key={this.state.nominee_genders[index]}>Gender: {this.state.nominee_genders[index]}</li>
                                              <li key={this.state.nominee_ages[index]}>Age: {this.state.nominee_ages[index]}</li>
                                              {nomination.individual ? <li key={nomination.individual}>Party: Independent Candidate</li> : <li key={nomination.party}>Party: {nomination.party}</li>}
                                              {!(nomination.individual) && <li key={nomination.party_ticket_id}>Party Ticket ID: {nomination.party_ticket_id}</li>}
                                              <li key={nomination.manifesto}>Election Manifesto: {nomination.manifesto}</li>
                                          </li>
                                      </ul>
                                      <Button type="primary" onClick={() => this.onVote(nomination.hasura_id, this.props.match.params.id)}>Vote</Button>
                                      <br />
                                      <br />
                                      {this.state.textBoxShow === nomination.hasura_id && <Search placeholder="Enter your Voting Credentials"  enterButton="Cast Vote" onSearch={value => this.onCastVote(nomination.hasura_id, this.props.match.params.id, value)} />}
                                      <br />
                                      <br />
                                  </li>

                              );
                          })}
                      </ol>
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
  header:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
}

//implement this after clicking cast vote btn once: disabled={this.state.disableCastVoteButton}
//TODO: Ask Sai to change Individual to Independent
export default ShowElection;
