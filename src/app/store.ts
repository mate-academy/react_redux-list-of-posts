import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authorReducer from '../features/authorSlice';
import usersReducer from '../features/usersSlice';
import postsReducer from '../features/postsSlice';
import selectedPostReducer from '../features/selectedPostSlice';
import commentsReducer from '../features/commentsSlice';

export const store = configureStore({
  reducer: {
    usersState: usersReducer,
    authorState: authorReducer,
    postsState: postsReducer,
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
