import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
// eslint-disable-next-line import/no-cycle
import postsSLice from '../features/posts/postsSLice';
// eslint-disable-next-line import/no-cycle
import usersReducer from '../features/users/usersSlice';
// eslint-disable-next-line import/no-cycle
// import commentsReducer from '../features/comments/commentsSlice';
// eslint-disable-next-line import/no-cycle
// import newCommentReducer from '../features/newComment/newCommentSlice';
// eslint-disable-next-line import/no-cycle
import commentsReducer from '../features/comments/commentsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    posts: postsSLice,
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
