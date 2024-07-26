import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import PostsReducer from '../features/Posts/postsSlice';
import authorReducer from '../features/Author/authorSlice';
import commentsReducer from '../features/Comments/commentsSlice';
import selectedPostReducer from '../features/SelectedPost/selectedPostSlice';

export const store = configureStore({
  reducer: {
    posts: PostsReducer,
    author: authorReducer,
    comments: commentsReducer,
    selecetedPost: selectedPostReducer,
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
