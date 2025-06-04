import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { usersReducer } from '../features/usersSlice';
import { postsReducer } from '../features/postsSlice';
// eslint-disable-next-line max-len
import { selectedPostReducer } from '../features/selectedPostSlice';
import { authorReducer } from '../features/authorSlice';
import { commentsReducer } from '../features/commentsSlice';
// eslint-disable-next-line import/no-cycle

export const store = configureStore({
  reducer: {
    userState: usersReducer,
    postsState: postsReducer,
    authorState: authorReducer,
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
