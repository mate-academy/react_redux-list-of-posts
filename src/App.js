import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import { getNextState } from './redux/reducers';
import PostListHandler from './Components/PostListHandler';
import thunk from 'redux-thunk';

const store = createStore(getNextState, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <PostListHandler />
    </Provider>
  );
}

export default App;
