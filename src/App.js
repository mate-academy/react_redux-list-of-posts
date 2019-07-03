import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import PostListHandler from './components/MainHandler';
import { reducer } from './redux/reducer';

const store = createStore(reducer, applyMiddleware(thunk))

function App() {
  return (
    <Provider store={store}>
      <PostListHandler />
    </Provider>
  )
}

export default App;
