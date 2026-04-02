import {
  configureStore,
  ThunkAction,
  Action,
  combineSlices,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { userSlice } from '../features/user/userSlice';
import { counterSlice } from '../features/counter/counterSlice';
import { authorSlice } from '../features/author/authorSlice';
import { postsSlice } from '../features/posts/postsSlice';
import { selectedPostSlice } from '../features/selectedPost/selectedPostSlice';
import { commentsSlice } from '../features/comments/commentsSlice';

const rootReducer = combineSlices(
  userSlice,
  counterSlice,
  authorSlice,
  postsSlice,
  selectedPostSlice,
  commentsSlice,
);

export const store = configureStore({
  reducer: rootReducer,
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
