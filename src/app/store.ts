import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import authorReducer from '../features/AuthorSlice';
import commentsReducer from '../features/CommentsSlice';
import postReducer from '../features/PostSlice';
import selectedPost from '../features/SelectedPostSlice';
import userReducer from '../features/usersSlice';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    author: authorReducer,
    comments: commentsReducer,
    posts: postReducer,
    selected: selectedPost,
    users: userReducer,
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
