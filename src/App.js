import React from 'react';
import './App.css';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reducer } from './redux/reducer';
import { PostListHandler } from './components/PostListHandler';

const store = createStore(reducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <PostListHandler />
    </Provider>
  );
}

export default App;
