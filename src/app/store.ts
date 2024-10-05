import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { reducer as usersReducer } from '../features/usersSlice';
import { reducer as authorReducer } from '../features/authorSlice';
import { reducer as postsReducer } from '../features/postsSlice';
import { reducer as selectedPostReducer } from '../features/selectedPostSlice';
import { reducer as commentsReducer } from '../features/comentsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    author: authorReducer,
    posts: postsReducer,
    selectedPost: selectedPostReducer,
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
