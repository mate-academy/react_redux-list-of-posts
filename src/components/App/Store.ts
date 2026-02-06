import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { commentsSlice } from '../slicers/comentsSlice';
import { usersSlice } from '../slicers/usersSlice';
import { postsSlice } from '../slicers/postsSlice';
import { authorSlice } from '../slicers/authorSlice';
import { selectedPostSlice } from '../slicers/selectedPostSlice';

const rootReducer = combineSlices(commentsSlice, usersSlice, postsSlice, authorSlice, selectedPostSlice);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
