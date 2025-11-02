import {
  configureStore,
  ThunkAction,
  Action,
  combineSlices,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { userSlice } from '../features/usersSlice';
import { authorSlice } from '../features/authorSlice';
import { postsSlice } from '../features/postsSlice';
import { selectedPostSlice } from '../features/selectedPostSlice';
import { commentsSlice } from '../features/commentsSlice';

const RootReducer = combineSlices({
  users: userSlice.reducer,
  author: authorSlice.reducer,
  posts: postsSlice.reducer,
  selectedPost: selectedPostSlice.reducer,
  comments: commentsSlice.reducer,
});

export const store = configureStore({
  reducer: RootReducer,
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
