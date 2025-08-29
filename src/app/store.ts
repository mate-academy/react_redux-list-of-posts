import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import infoAppReducer from '../features/counter/posts/infoAppSlice';
import usersSliceReducer from '../features/counter/users/usersSlice';
import commentsSliceReducer from '../features/counter/comments/commentsSlice';
import selectedPostReducer from '../features/counter/selectedPost/selectedPost';
import authorSliceReducer from '../features/counter/author/authorSlice';

export const store = configureStore({
  reducer: {
    author: authorSliceReducer,
    posts: infoAppReducer,
    selectedPost: selectedPostReducer,
    users: usersSliceReducer,
    comments: commentsSliceReducer,
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
