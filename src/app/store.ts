import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { reducer as postReducer } from '../features/postsSlice';
import { reducer as authorReducer } from '../features/authorSlice';
import { reducer as usersReducer } from '../features/usersSlice';
import { reducer as commentsReducer } from '../features/commentsSlice';
import { reducer as newCommentReducer } from '../features/NewCommentFormSlice';
import { selectedPostSlice } from '../features/selectedPostSlice';

export const store = configureStore({
  reducer: {
    posts: postReducer,
    users: usersReducer,
    author: authorReducer,
    comments: commentsReducer,
    selectedPost: selectedPostSlice.reducer,
    newCommentForm: newCommentReducer,
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
