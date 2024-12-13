import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import usersReducer from '../features/users/usersSlice';
import authorReducer from '../features/author/authorSlice';
import postsReducer from '../features/posts/postsSlice';
import selectedPostReducer from '../features/selectedPost/selectedPostSlice';
import commentsReducer from '../features/comments/commentsSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  users: usersReducer,
  author: authorReducer,
  posts: postsReducer,
  selectedPost: selectedPostReducer,
  comments: commentsReducer,
});

export default rootReducer;
