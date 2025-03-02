import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import authorReducer from '../features/author/authorSlice';
// import commentsReducer from '../features/comments/commentsSlice';
import counterReducer from '../features/counter/counterSlice';
// import postsReducer from '../features/posts/postsSlice';
// import selectedPostReducer from '../features/selected/selectedPostSlice';
import usersReducer from '../features/users/usersSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    author: authorReducer,
    // posts: postsReducer,
    // selectedPostReducer: selectedPostReducer,
    // comments: commentsReducer,
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
