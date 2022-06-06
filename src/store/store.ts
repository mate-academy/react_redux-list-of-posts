import { configureStore, combineReducers } from '@reduxjs/toolkit';
import postsReducer from './reducers/PostSlice';
import commentReducer from './reducers/CommentSlice';

const rootReducer = combineReducers({
  postsReducer,
  commentReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
