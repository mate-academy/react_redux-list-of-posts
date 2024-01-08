import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import usersReducer from '../features/usersSlice';
import userReducer from '../features/selectedUser';
import postsReducer from '../features/postsSlice';
import postReducer from '../features/selectedPostSlice';
import commentsReducer from '../features/commentsSlice';
import newCommentReducer from '../features/newCommentFormSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    selectedUser: userReducer,
    posts: postsReducer,
    currentPost: postReducer,
    postComments: commentsReducer,
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
