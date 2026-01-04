import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import { usersSlice } from '../features/usersSlice';
import { authorSlice } from '../features/authorSlice';
import { postsSlice } from '../features/postsSlice';
import { commentsSlice } from '../features/commentsSlice';
import { selectedPostSlice } from '../features/selectedPostSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    authorSlice: authorSlice.reducer,
    usersSlice: usersSlice.reducer,
    postsSlice: postsSlice.reducer,
    commentsSlice: commentsSlice.reducer,
    selectedPostSlice: selectedPostSlice.reducer,
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
