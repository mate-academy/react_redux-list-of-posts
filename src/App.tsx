import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import { PostList } from './components/PostsList/PostsList';
import './App.css';

export const App = () => (
  <Provider store={store}>
    <PostList />
  </Provider>

);
