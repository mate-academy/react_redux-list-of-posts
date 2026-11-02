import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import { postSlice } from '../features/postSlice/postSlice';
import { userSlice } from '../features/userSlice';
import { authorSlice } from '../features/autorSlice';
import { selectedPostSlice } from '../features/selectedPost';
import { commentsSlice } from '../features/commentSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postSlice.reducer,
    users: userSlice.reducer,
    authors: authorSlice.reducer,
    selectedPost: selectedPostSlice.reducer,
    comments: commentsSlice.reducer,
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
