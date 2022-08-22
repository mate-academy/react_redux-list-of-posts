import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import usersReducer from '../features/users/usersSlice';
import userPostsReducer from '../features/userPosts/userPostsSlice';
import postCommentsReducer from '../features/postComments/postCommentsSlice';

export const store = configureStore({
  reducer: {
    userPosts: userPostsReducer,
    users: usersReducer,
    postComments: postCommentsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
