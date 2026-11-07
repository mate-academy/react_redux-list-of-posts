import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import usersReducer from '../features/counter/Users/usersSlice';
import selectedUsersReducer from '../features/counter/Users/selectedUsersSlice';
import selectedPostReducer from '../features/counter/Posts/postSelectedSlice';
import commentsReducer from '../features/Coments/coments';
import newCommentReducer from '../features/Coments/newCommentSlice';

export const store = configureStore({
  reducer: {
    newComment: newCommentReducer,
    comments: commentsReducer,
    setPost: selectedPostReducer,
    posts: selectedUsersReducer,
    users: usersReducer,
    counter: counterReducer,
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
