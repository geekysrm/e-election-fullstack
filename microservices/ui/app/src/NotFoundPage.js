import React from 'react';
import './NotFoundPage.css'
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div>
  <link href='https://fonts.googleapis.com/css?family=Varela+Round' rel='stylesheet' type='text/css' />
  <div>
    <h1 className='body'>404</h1>
    <div className='content'>
    <p className='content'>It looks like you are lost..</p>
    <a href="/">Go home</a>
    </div>
  </div>
  </div>
);

export default NotFoundPage;
