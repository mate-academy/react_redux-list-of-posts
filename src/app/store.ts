import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import PostReducer from '../slices/postsSlice';
import UserReducer from '../slices/usersSlice';
import AuthorReducer from '../slices/authorSlice';
import SelectedPostReducer from '../slices/selectedPost';
import CommentsReducer from '../slices/commentsSlice';

export const store = configureStore({
  reducer: {
    posts: PostReducer,
    users: UserReducer,
    author: AuthorReducer,
    selectedPost: SelectedPostReducer,
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
