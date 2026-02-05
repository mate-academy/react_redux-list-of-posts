import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { commentsSlice } from '../slicers/comentsSlice';
import { usersSlice } from '../slicers/usersSlice';
import { postsSlice } from '../slicers/postsSlice';


const rootReducer = combineSlices(
  commentsSlice, usersSlice, postsSlice
);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
