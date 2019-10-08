import React from 'react';
import './App.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import getNextState from './redux/redusers';
import PostListHandler from './components/PostListHandler';

const store = createStore(getNextState, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <PostListHandler />
    </Provider>
  );
}

export default App;
