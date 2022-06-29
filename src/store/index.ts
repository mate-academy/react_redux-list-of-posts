import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';
import { Post, Comment, State } from '../react-app-env';

enum ActionType {
  SET_POSTS = 'SET_POSTS',
  SET_SELECTED_POST = ' SET_SELECTED_POST',
  SET_COMMENTS = 'SET_COMMENTS',
  ADD_COMMENT = ' ADD_COMMENT',
}

const initialState: State = {
  posts: [],
  comments: [],
  selectedPost: null,
};

export const setPostsAction = createAction<Post[]>(ActionType.SET_POSTS);
// eslint-disable-next-line max-len
export const setSelectedPostAction = createAction<Post>(ActionType.SET_SELECTED_POST);
// eslint-disable-next-line max-len
export const setCommentsAction = createAction<Comment[]>(ActionType.SET_COMMENTS);
export const addCommentAction = createAction<Comment>(ActionType.ADD_COMMENT);

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setPostsAction, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.posts = action.payload;
  });
  builder.addCase(setSelectedPostAction, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.selectedPost = action.payload;
  });
  builder.addCase(setCommentsAction, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.comments = action.payload;
  });
  builder.addCase(addCommentAction, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.comments.push(action.payload);
  });
});

export const store = configureStore({
  reducer,
});

export default store;
