/* eslint-disable import/no-cycle */
import { configureStore } from '@reduxjs/toolkit';
import listOfPostsReduser from './listOfPostsSlice';
import postDetailsReducer from './postDetailsSlice';

// import { toDosApi } from './apiWithRedux';

export const store = configureStore({
  reducer: {
    listOfPosts: listOfPostsReduser,
    postDetails: postDetailsReducer,
    // [toDosApi.reducerPath]: toDosApi.reducer,
  },

  // eslint-disable-next-line max-len
  // middleware: (getDefaultMiddleware) => (getDefaultMiddleware().concat(toDosApi.middleware)),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
