import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from "redux-thunk"
import postApp from './redux/reducer';
import './App.css'
import PostListHandler from './components/PostListHandler'

function App() {
  const store = createStore(postApp, applyMiddleware(thunk))
  return (
    <Provider store={store}>
      <PostListHandler/>
    </Provider>
  );
}

export default App;
