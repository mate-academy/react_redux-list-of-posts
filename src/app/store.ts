import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import { authorReducer } from '../features/authorSlice';
import { userReducer } from '../features/userSlice';
import { postReducer } from '../features/postsSlice';
import { selectedPostsReducer } from '../features/selectedPostSlice';
import { CommentReducer } from '../features/commentSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    author: authorReducer,
    users: userReducer,
    posts: postReducer,
    selectedPost: selectedPostsReducer,
    commentPost: CommentReducer,
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
