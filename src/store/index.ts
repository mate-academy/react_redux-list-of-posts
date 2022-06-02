import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { PostsReducer, PostsState } from './PostsReducer';
import { CommentsReducer, CommentsState } from './CommentsReducer';
import { UserReducer, UserState } from './UserReducer';

const rootReducer = combineReducers({
  PostsReducer,
  CommentsReducer,
  UserReducer,
});

export type State = {
  PostsReducer: PostsState;
  CommentsReducer: CommentsState;
  UserReducer: UserState;
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
