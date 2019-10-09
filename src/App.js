import React from 'react';
import './App.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './store/reducers';
import PostsListContainer from './components/PostsList/PostsListContainer';

const middlewares = [thunkMiddleware];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

class App extends React.Component {
  componentDidMount() { }

  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <h1>Posts List</h1>
          <PostsListContainer />
        </div>
      </Provider>
    );
  }
}

export default App;
