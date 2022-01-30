import { combineReducers } from 'redux';
import { postsReducer } from './postsReducer';
import { usersReducer } from './usersReducer';
import { commentsReducer } from './commentsReducer';

export const rootReducer = combineReducers({
  postsReducer,
  usersReducer,
  commentsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
