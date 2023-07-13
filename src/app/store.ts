import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { userSlice } from '../features/users';
import { authorSlice } from '../features/author';
import { postsSlice } from '../features/posts';
import { selectedPostSlice } from '../features/selectedPost';
import { commentsSlice } from '../features/comments';
import { commentsFormSlice } from '../features/commentForm';

export const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    author: authorSlice.reducer,
    posts: postsSlice.reducer,
    selectedPost: selectedPostSlice.reducer,
    comments: commentsSlice.reducer,
    commentsForm: commentsFormSlice.reducer,
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
