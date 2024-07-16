import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { userReducer } from '../features/userSlice';
import { authorReducer } from '../features/authorSlice';
import { commentReducer } from '../features/commentsSlice';
import { postReducer } from '../features/postsSlice';
import { selectedPostReducer } from '../features/selectedPostSlice';
// eslint-disable-next-line import/no-cycle

export const store = configureStore({
  reducer: {
    users: userReducer,
    authors: authorReducer,
    comments: commentReducer,
    posts: postReducer,
    selectedPost: selectedPostReducer,
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
