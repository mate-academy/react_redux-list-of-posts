import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import usersReduser from '../features/usersSlice';
import authorReduser from '../features/authorSlice';
import postsReduser from '../features/postsSlice';
import selectedPostReduser from '../features/selectedPostSlice';
import commentsReduser from '../features/commentsSlice';
import NewCommentFormReduser from '../features/NewCommentFormSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReduser,
    author: authorReduser,
    posts: postsReduser,
    selectedPost: selectedPostReduser,
    comments: commentsReduser,
    NewCommentForm: NewCommentFormReduser,
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
