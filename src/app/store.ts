/* eslint-disable max-len */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import postsSlice from '../features/counter/features/postsSlice';
import selectedAuthorPost from '../features/counter/features/selectedAuthorSlice';
import selectedPostSlice from '../features/counter/features/selectedPostSlice';
import newCommentFormSlice from '../features/counter/features/newCommentFormSlice';
import userContextSlice from '../features/counter/features/userContextSlice';
import getPostDetailsSlice from '../features/counter/features/getPostDetailsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsSlice,
    author: selectedAuthorPost,
    selectedPost: selectedPostSlice,
    formSlice: newCommentFormSlice,
    setUser: userContextSlice,
    postDetails: getPostDetailsSlice,
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
