import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import authorSlice from '../featuresPosts/authorSlice';
import commentsSlice from '../featuresPosts/commentsSlice';
import postsSlice from '../featuresPosts/postsSlice';
import selectedPostSlice from '../featuresPosts/selectedPostSlice';
import usersSlice from '../featuresPosts/userSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersSlice,
    author: authorSlice,
    posts: postsSlice,
    selectedPost: selectedPostSlice,
    comments: commentsSlice,
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
