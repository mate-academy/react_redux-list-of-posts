import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../components/Users';
import postsReducer from '../components/Posts';
import commentsReducer from '../components/Comments';
import authorReducer from '../components/author';
import SelectedPostReducer from '../components/SelectedPost';
import commentDataReducer from '../components/NewCommentState';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: userReducer,
    author: authorReducer,
    posts: postsReducer,
    selectedPost: SelectedPostReducer,
    comments: commentsReducer,
    commentData: commentDataReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */
