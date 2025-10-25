import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authorReducer from '../slices/authorSlice';
import postsReducer from '../slices/postsSlice';
import selectedPostReducer from '../slices/selectedPostSlice';
import usersReducer from '../slices/usersSlice';
import commentsReducer from '../slices/commentsSlice';

/*export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});*/

/*export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;*/

/* eslint-disable @typescript-eslint/indent */
/*export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;*/
/* eslint-enable @typescript-eslint/indent */

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    author: authorReducer,
    posts: postsReducer,
    selectedPost: selectedPostReducer,
    users: usersReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
