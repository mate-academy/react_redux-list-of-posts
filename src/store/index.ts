import {
  configureStore, createAction, createReducer,
} from '@reduxjs/toolkit';
import {
  Post, State, User,
} from '../react-app-env';

export const getUsersAction = createAction<User[]>('SET_USERS');
export const getPostsAction = createAction<Post[]>('SET_POST');
// eslint-disable-next-line max-len
export const getCommentsAction = createAction<any>('SET_COMMENTS');
export const addCommentAction = createAction<any>('ADD_COMMENT');

const initialState: State = {
  posts: [],
  users: [],
  comments: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getUsersAction, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.users = action.payload;
    })
    .addCase(getPostsAction, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.posts = action.payload;
    })
    // eslint-disable-next-line max-len
    .addCase(getCommentsAction, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.comments = action.payload;
    })
    .addCase(addCommentAction, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.comments.push(action.payload);
    });
});

export const store = configureStore({
  reducer,
});
