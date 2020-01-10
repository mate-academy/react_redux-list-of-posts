import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import PostsList from './PostsList';
import store from './store/index';

ReactDOM.render(
  <Provider store={store}>
    <PostsList />
  </Provider>,
  document.getElementById('root')
);
