// eslint-disable-next-line max-len
import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';

enum ActionType {
  SET_POSTS = 'SET_POSTS',
  SET_USERS = 'SET_USERS',
  SET_POST_ID = 'SET_POST_ID',
  SET_POST = 'SET_POST',
  SET_POST_COMMENTS = 'SET_POST_COMMENTS',
}

const initialState: State = {
  posts: [],
  users: [],
  selectedPostId: 0,
  selectedPost: null,
  postComments: [],
};

export const setPosts = createAction<Post[]>(ActionType.SET_POSTS);
export const setUsers = createAction<User[]>(ActionType.SET_USERS);
export const setSelectedPostId = createAction<number>(ActionType.SET_POST_ID);
export const setSelectedPost = createAction<Post | null>(ActionType.SET_POST);
// eslint-disable-next-line max-len
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setPostComments = createAction<any>(ActionType.SET_POST_COMMENTS);

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setPosts, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.posts = action.payload;
    })
    .addCase(setUsers, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.users = action.payload;
    })
    .addCase(setSelectedPostId, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.selectedPostId = action.payload;
    })
    .addCase(setSelectedPost, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.selectedPost = action.payload;
    })
    .addCase(setPostComments, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.postComments = action.payload;
    });
});

export const store = configureStore({
  reducer,
});
