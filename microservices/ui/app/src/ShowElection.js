import React from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';

// const ShowElection = ( { match: { params: {id } } } ) => (
//     <h1>{id}</h1>
    
// );

class ShowElection extends Component {

    constructor(props) {
        super(props);

        // this.state = {
        // };
    }

    // componentDidMount() {
    //     axios({
    //         method: 'post',
    //         url: 'https://api.artfully11.hasura-app.io/get-elections',

    //         config: { headers: { 'Content-Type': 'application/json' } }
    //     })
    //         .then(response => {
    //             console.log(response.data);




    //             this.setState({ elections: response.data });
    //         })
    //         .catch(error => {
    //             alert(`Sorry, can't fetch elections right now!`);
    //             console.log('Post request failed!');
    //         });
    // }


    render() {
        return (
            <div>
                <h1>{this.props.match.id}</h1>

            </div>
        );
    }
}

export default ShowElection;