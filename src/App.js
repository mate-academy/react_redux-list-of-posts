import React from 'react';
import './App.css';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from "react-redux";
import {getNextState} from "./redux/reducers";
import PostListHandler from "./components/PostListHandler";
import thunk from "redux-thunk";

const store = createStore(getNextState, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <PostListHandler />
    </Provider>
  );
}

export default App;
