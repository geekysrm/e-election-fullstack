import React from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';

export default ( { match: { params: {id } } } ) => (
    <h1>{id}</h1>
);