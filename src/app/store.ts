import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import UsersReducer from '../features/usersSlice';
import AuthorReducer from '../features/authorSlice';
import SelectedPostReducer from '../features/selectedPost';
import PostsReducer from '../features/postsSlice';
import CommentsReducer from '../features/commentsSlice';

export const store = configureStore({
  reducer: {
    users: UsersReducer,
    author: AuthorReducer,
    selecedPost: SelectedPostReducer,
    posts: PostsReducer,
    comments: CommentsReducer,
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
