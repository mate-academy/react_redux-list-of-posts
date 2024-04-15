import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import UsersContext from '../components/slices/UsersSlice';
import PostsContext from '../components/slices/PostsSlice';
import CommentsContext from '../components/slices/CommentsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: UsersContext,
    selectedUser: UsersContext,
    userPosts: PostsContext,
    comments: CommentsContext,
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
