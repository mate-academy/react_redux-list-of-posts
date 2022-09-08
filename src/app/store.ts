import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
// eslint-disable-next-line import/no-cycle
import userReducer from '../features/usersStateSlice';
// eslint-disable-next-line import/no-cycle
import authorReducer from '../features/authorStateSlice';
// eslint-disable-next-line import/no-cycle
import postsReducer from '../features/postsStateSlice';
// eslint-disable-next-line import/no-cycle
import postReducer from '../features/postStateSllice';
// eslint-disable-next-line import/no-cycle
import commentsReducer from '../features/commentsStateSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    usersState: userReducer,
    authorState: authorReducer,
    postsState: postsReducer,
    postState: postReducer,
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
