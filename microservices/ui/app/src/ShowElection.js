import React from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';

class ShowElection extends React.Component { 


    
render( { match: { params: {id } } } ) 
{    return (
        <h1>{id}</h1>
        
    );
}

}
    
export default ShowElection;