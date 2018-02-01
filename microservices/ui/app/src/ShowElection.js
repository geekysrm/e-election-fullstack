import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';

// const ShowElection = ( { match: { params: {id } } } ) => (
//     <h1>{id}</h1>
    
// );

class ShowElection extends Component {

    constructor(props) {
        super(props);

        this.state = {
            electionDetails:[],         //Store details of the particular election shown in the page
            nominations: [],
            names: []
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
                
  
                    this.state.nominations.map(function (nomination) {
                        axios({
                            method: 'post',
                            url: 'https://api.artfully11.hasura-app.io/view-credentials',
                            data: { serial: nomination.hasura_id },
                            config: { headers: { 'Content-Type': 'application/json' } }
                        })
                            .then(response => {
                                
                                const nowDate = moment();
                                console.log(response.data[0]);
                                var age = nowDate.diff(response.data[0].dob, 'years');
                                console.log(age);



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

   

    render() {
        return (
            <div>
                <h1>Election with Id: {this.props.match.params.id}</h1>
                <Button type="primary" onClick={this.onViewNominations}>View All Nominations</Button>
                <Button type="primary" onClick={this.onNominate}>Nominate Yourself</Button>
                <div>
                    
                    <ol>
                    {this.state.nominations.map(function (nomination) {
                        return (
                            
                            
                            <li key={nomination.hasura_id}>

                                <ul>
                                    <li key={nomination.hasura_id}>
                                        <li key={nomination.manifesto}>Election Manifesto: {nomination.manifesto}</li>
                                    </li>
                                </ul>
                                
                                <br />
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
//ASK SAI TO GIVE NAME OF NOMINATED CANDIDATE in /view-nominations
export default ShowElection;