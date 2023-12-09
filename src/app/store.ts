import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import usersReducer from '../features/UsersSlicer';
import AuthorReducer from '../features/AuthorSlicer';
import postsSlicer from '../features/postsSlicer';
import selectedPostReducer from '../features/selectedPostSlicer';
import commentsReducer from '../features/commentsSlicer';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    author: AuthorReducer,
    posts: postsSlicer,
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
