import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import postReducer from '../features/post/postSlice';
import commentsReducer from '../features/comments/commentsSlice';

const rootReducer = combineReducers({
  userReducer,
  postReducer,
  commentsReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
