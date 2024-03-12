import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import usersReducer from '../features/slicers/getUsers';
import authorReducer from '../features/slicers/getAuthor';
import commentsReducer from '../features/slicers/getComments';
import commentReducer from '../features/slicers/setNewComment';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    getUsers: usersReducer,
    getAuthor: authorReducer,
    getComments: commentsReducer,
    newComment: commentReducer,
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
