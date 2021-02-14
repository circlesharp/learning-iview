import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import App from './App';

axios.get('/items').then(console.log);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
