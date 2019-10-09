import { combineReducers } from 'redux';
import postsListReducer from './postsList/reducers';

const rootReducer = combineReducers({
  postsListState: postsListReducer,
});

export default rootReducer;
