import { combineReducers } from 'redux';
import posts from './posts/posts';

const rootReducer = combineReducers({
  posts,
});

export default rootReducer;
