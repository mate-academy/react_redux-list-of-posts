import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import './index.css';
import PostList from './components/PostList';

ReactDOM.render(
  <Provider store={store}>
    <PostList />
  </Provider>,
  document.getElementById('root')
);
