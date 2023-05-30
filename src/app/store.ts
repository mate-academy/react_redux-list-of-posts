import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer from '../components/Users/usersSlice';
import postsReducer from '../components/Posts/userPostsSlicer';
import commentsReducer from '../components/Comments/commentsSlicer';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType, RootState, unknown, Action<string>
>;
