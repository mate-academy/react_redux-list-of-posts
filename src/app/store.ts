import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import usersReducer from '../features/slices/usersSlice';
import authorReducer from '../features/slices/authorSlice';
import postReducer from '../features/slices/postsSlice';
import setSelectedPostReducer from '../features/slices/selectedPostSlice';
import commentsReducer from '../features/slices/commentsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    author: authorReducer,
    posts: postReducer,
    selectedPost: setSelectedPostReducer,
    comments: commentsReducer,
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
