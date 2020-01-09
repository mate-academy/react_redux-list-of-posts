import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import index from './store/index';

ReactDOM.render(
  <Provider store={ index }><App /></Provider>,
  document.getElementById('root')
);
