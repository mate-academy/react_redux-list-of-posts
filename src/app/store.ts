import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { usersReducer } from '../features/usersSlice';
import { authorReducer } from '../features/authorSlice';
import { postsReducer } from '../features/postsSlice';
import { selectedPostReducer } from '../features/selectedPostSlice';
import { commentsReducer } from '../features/commentsSlice';
import { newCommentFormReducer } from '../features/newCommentFormSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    author: authorReducer,
    posts: postsReducer,
    selectedPost: selectedPostReducer,
    comments: commentsReducer,
    newCommentForm: newCommentFormReducer,
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
