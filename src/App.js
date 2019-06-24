import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import getNextState from './redux/reducer';
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
