import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import Posts from '../features/Posts';
import Users from '../features/Users';
import SelectedPost from '../features/SelectedPost';
import ComentSlice from '../features/ComentSlice';

export const store = configureStore({
  reducer: {
    posts: Posts,
    users: Users,
    selectedPost: SelectedPost,
    comments: ComentSlice,
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
