/* eslint-disable import/no-cycle */
import { configureStore } from '@reduxjs/toolkit';
import listOfPostsReduser from './listOfPostsSlice';
import postDetailsReducer from './postDetailsSlice';

export const store = configureStore({
  reducer: {
    listOfPosts: listOfPostsReduser,
    postDetails: postDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
