import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';

import { PostsReducer, PostsState } from './PostsReducer';
import { CommentsReducer, CommentsState } from './CommentsReducer';
import { UserReducer, UserState } from './UserReducer';
import { CommentsActions } from './CommentsReducer/actionTypes';
import { UserActions } from './UserReducer/actionTypes';
import { PostsActions } from './PostsReducer/actionTypes';

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

export type AllActions = PostsActions | CommentsActions | UserActions;
export type Thunk = (dispatch: Dispatch<AllActions>) => Promise<void>;

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
