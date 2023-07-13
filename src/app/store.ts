import {
  configureStore,
  ThunkAction,
  Action,
  Store,
  AnyAction,
  ThunkDispatch,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import usersReducer,
{ UsersState } from '../features/users/userSlice';
import postsReducer,
{ PostsState } from '../features/posts/postsSlice';
import commentsReducer,
{ CommentsState } from '../features/comments/commentsSlice';

export type AppThunkDispatch = ThunkDispatch<RootState, {}, AnyAction>;

export type AppStore = Omit<Store<RootState, AnyAction>, 'dispatch'> & {
  dispatch: AppThunkDispatch;
};

export interface RootState {
  users: UsersState,
  posts: PostsState,
  comments: CommentsState,
}

export const store: AppStore = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */
