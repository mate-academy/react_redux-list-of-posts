import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
// import counterReducer from '../features/counter/counterSlice';
import { usersSlice } from '../features/users';
import { authorSlice } from '../features/author';
import { postsSlice } from '../features/posts';
import { selectedPostSlice } from '../features/selectedPost';
import { commentsSlice } from '../features/comments';

const rootReducer = combineReducers({
  [usersSlice.name]: usersSlice.reducer,
  [authorSlice.name]: authorSlice.reducer,
  [postsSlice.name]: postsSlice.reducer,
  [selectedPostSlice.name]: selectedPostSlice.reducer,
  [commentsSlice.name]: commentsSlice.reducer,
});

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
