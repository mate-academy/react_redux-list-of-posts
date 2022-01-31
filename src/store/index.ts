import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { postsReducer } from './postsReducer';
import { usersReducer } from './usersReducer';
import { commentsReducer } from './commentsReducer';

const rootReducer = combineReducers({
  postsReducer,
  usersReducer,
  commentsReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
