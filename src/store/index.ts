import {
  configureStore,
  createReducer,
  createAction,
} from '@reduxjs/toolkit';
import {
  Post,
  State,
  User,
  Comment,
} from '../react-app-env';

export const initialState: State = {
  posts: [],
  users: [],
  currentPostId: '',
  currentPost: null,
  comments: null,
};

export const setPosts = createAction<Post[]>('SET_POSTS');
export const setUsers = createAction<User[]>('SET_USERS');
export const setCurrentPostId = createAction<string>('SET_CURRENT_POST_ID');
export const setCurrentPost = createAction<Post>('SET_CURRENT_POST');
export const setComments = createAction<Comment[]>('SET_COMMENTS');

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setPosts, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.posts = action.payload;
  });
  builder.addCase(setUsers, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.users = action.payload;
  });
  builder.addCase(setCurrentPostId, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.currentPostId = action.payload;
  });
  builder.addCase(setCurrentPost, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.currentPost = action.payload;
  });
  builder.addCase(setComments, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.comments = action.payload;
  });
});

export const store = configureStore({ reducer });
