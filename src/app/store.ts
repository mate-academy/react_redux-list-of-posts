import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import usersReducer from '../features/users/usersSlice';
// eslint-disable-next-line max-len
import selectedAuthorReducer from '../features/selectedAuthor/selectedAuthorSlice';
import userPostsReducer from '../features/userPosts/userPostsSlice';
import selectedPostReducer from '../features/selectedPost/selectedPostSlice';
import commentsReducer from '../features/comments/commentsSlice';

export const store = configureStore({
  reducer: {
    counterState: counterReducer,
    usersState: usersReducer,
    selectedAuthorState: selectedAuthorReducer,
    userPostsState: userPostsReducer,
    selectedPostState: selectedPostReducer,
    commentsState: commentsReducer,
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
