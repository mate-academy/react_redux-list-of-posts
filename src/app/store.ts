import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import postsSliceReducer from '../features/postsSlice';
import usersSliceReducer from '../features/userSlice';
import commentsSliceReducer from '../features/commentsSlice';
import authorSliceReducer from '../features/authorSlice';
import selectedPostSliceReducer from '../features/selectedPostSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsSliceReducer,
    users: usersSliceReducer,
    comments: commentsSliceReducer,
    author: authorSliceReducer,
    selectedPost: selectedPostSliceReducer,
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
