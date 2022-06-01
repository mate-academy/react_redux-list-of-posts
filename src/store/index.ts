import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { PostsReducer } from './PostsReducer';
import { CommentsReducer } from './CommentsReducer';
import { CommentsState } from '../types/CommentsState';
import { PostsState } from '../types/PostsState';

const rootReducer = combineReducers({
  PostsReducer,
  CommentsReducer,
});

export type State = {
  PostsReducer: PostsState,
  CommentsReducer: CommentsState,
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
