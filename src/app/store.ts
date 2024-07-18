import {
  configureStore,
  combineSlices,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-cycle
// import counterReducer from '../features/counter/counterSlice';
import { usersSlice } from '../features/users';
import { postsSlice } from '../features/posts';
import { authorSlice } from '../features/author';
import { selectedPostSlice } from '../features/selectedPost';
import { commentsSlice } from '../features/comments';

const rootReducer = combineSlices(
  usersSlice,
  postsSlice,
  authorSlice,
  selectedPostSlice,
  commentsSlice,
);

export const store = configureStore({
  // reducer: {
  //   counter: counterReducer,
  // },
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// export type RootState = ReturnType<typeof rootReducer>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */
