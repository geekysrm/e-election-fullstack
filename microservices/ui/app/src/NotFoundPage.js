import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => (
  <div>
    <h1>404</h1>
    <h2>Page Not Found</h2>

    <p>Sorry, I couldn't find the page you were looking for.</p>

    <p>Try going <a href="javascript:twindow.history.back()">back to where you came from</a>, <a href="../">up a directory</a>, or to the <a href="/">home page</a>.</p>
  </div>
);

//see https://codepen.io/vineethtr/pen/YqeBVJ

export default NotFoundPage;
