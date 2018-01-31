import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import 'antd/dist/antd.css';

// const ShowElection = ( { match: { params: {id } } } ) => (
//     <h1>{id}</h1>
    
// );

class ShowElection extends Component {

    constructor(props) {
        super(props);

        this.state = {
            electionDetails:[],         //Store details of the particular election shown in the page
            nominations: []
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


            })
            .catch(error => {
                alert(`Sorry, can't fetch nominations list right now!`);
                console.log('Post request failed!');
            });

    }

    // onVote = () => {

    //     axios({
    //         method: 'post',
    //         url: 'https://api.artfully11.hasura-app.io/vote',
    //         data: {  },
    //         config: { headers: { 'Content-Type': 'application/json' } }
    //     })
    //         .then(response => {
    //             console.log(response.data);


    //         })
    //         .catch(error => {
    //             alert(`Sorry, can't fetch nominations list right now!`);
    //             console.log('Post request failed!');
    //         });

    // }



    render() {
        return (
            <div>
                <h1>Election with Id: {this.props.match.params.id}</h1>
                <Button type="primary" onClick={this.onViewNominations}>View Nominations</Button>
                <Button type="primary" onClick={this.onVote}>Vote</Button>
                <Button type="primary" onClick={this.onNominate}>Nominate Yourself</Button>
                <div>
                    The Nominations are:
                    <ol>
                    {this.state.nominations.map(function (nomination) {
                        return (
                            <li key={nomination.hasura_id}>

                                <ul>
                                    <li key={nomination.hasura_id}>
                                        <li key={nomination.manifesto}>Election Manifesto: {election.manifesto}</li>
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