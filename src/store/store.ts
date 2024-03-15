import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from './reducers/CounterSlice';
import usersReducer from './reducers/UsersSlice';
import userReducer from './reducers/AuthorSlice';
import postsReducer from './reducers/PostsSlice';
import selectedPostReducer from './reducers/SelectedPostSlice';
import commentsReducer from './reducers/CommentsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    author: userReducer,
    posts: postsReducer,
    post: selectedPostReducer,
    comments: commentsReducer,
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
