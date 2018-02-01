import React, { Component } from 'react';
import axios from 'axios';
import { Button,Input } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';

// const ShowElection = ( { match: { params: {id } } } ) => (
//     <h1>{id}</h1>
    
// );
const Search = Input.Search;

class ShowElection extends Component {

    constructor(props) {
        super(props);

        this.state = {
            electionDetails:[],         //Store details of the particular election shown in the page
            nominations: [],
            nominee_names: [],
            nominee_ages:[],
            nominee_genders:[],
            textBoxShow:false
        };
    }


    onViewNominations = () => {

        axios({
            method: 'post',
            url: 'https://api.artfully11.hasura-app.io/get-nominations',
            data: { eid: this.props.match.params.id },
            config: { headers: { 'Content-Type': 'application/json' } }
        })
            .then(response => {
                console.log(response.data);
                this.setState({ nominations: response.data });
                
                    this.state.nominations.map( (nomination) => {
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
                                    nominee_ages: this.state.nominee_ages.concat(age.toString()+" years")
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
        console.log("ID of candidate: " + id_of_candidate);
        console.log("Election ID: " + eid);

        this.setState({ textBoxShow: true });
    

    }

   

    render() {
        if(this.state.textBoxShow)
            const textBox = <Search placeholder="Enter your Voting Credentials" enterButton="Cast Vote" onSearch={value => console.log(value)} />;
        
            return (
            <div>
                <h1>Election with Id: {this.props.match.params.id}</h1>
                <Button type="primary" onClick={this.onViewNominations}>View All Nominations</Button>
                <Button type="primary" onClick={this.onNominate}>Nominate Yourself</Button>
                <div>
                    
                    <ol>

                        {this.state.nominations.map( (nomination, index) => {
                            return (


                                <li key={nomination.hasura_id}>

                                    <ul>
                                        <li key={nomination.hasura_id}>
                                            
                                            <li key={this.state.nominee_names[index]}>Name: {this.state.nominee_names[index]}</li>
                                            <li key={this.state.nominee_genders[index]}>Gender: {this.state.nominee_genders[index]}</li>
                                            <li key={this.state.nominee_ages[index]}>Age: {this.state.nominee_ages[index]}</li>
                                            {nomination.individual ? <li key={nomination.individual}>Party: Independent Candidate</li> : <li key={nomination.party}>Party: {nomination.party}</li> }
                                            {!(nomination.individual) && <li key={nomination.party_ticket_id}>Party Ticket ID: {nomination.party_ticket_id}</li> }
                                            <li key={nomination.manifesto}>Election Manifesto: {nomination.manifesto}</li>
                                        </li>
                                    </ul>
                                    <Button type="primary" onClick={() => this.onVote(nomination.hasura_id, this.props.match.params.id)}>Vote</Button>
                                    {textBox}
                                    <br />
                                </li>

                            );
                        })}
                    </ol>
                </div>

            </div>
        );
    }
}
//TODO: Ask Sai to change Individual to Independent
export default ShowElection;