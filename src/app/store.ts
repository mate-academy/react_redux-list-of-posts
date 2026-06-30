/* eslint-disable prettier/prettier */
import { configureStore, combineSlices } from '@reduxjs/toolkit';

import { postsSlice } from '../features/postsSlice';
import { usersSlice } from '../features/usersSlice';
import { commentsSlice } from '../features/commentsSlice';
import { authorSlice } from '../features/authorSlice';
import { selectedPostSlice } from '../features/selectedPostSlice';

const rootReducer = combineSlices(
  postsSlice, usersSlice, commentsSlice, authorSlice, selectedPostSlice,
);

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
