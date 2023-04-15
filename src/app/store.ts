import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import postsReducer from '../features/postsSlice';
import authorReducer from '../features/authorSlice';
import usersReducer from '../features/usersSlice';
import selectedPostReducer from '../features/selectedPostSlice';
import commentsReducer from '../features/commentsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    author: authorReducer,
    users: usersReducer,
    selectedPost: selectedPostReducer,
    comments: commentsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
