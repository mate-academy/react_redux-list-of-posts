import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import postsReducer from './postsReducer';
import loadingReducer from './loadingReducer';
import changeVisibleContent from './changeVisibleContent';

const rootReduce = combineReducers({
  posts: postsReducer,
  loadingButton: loadingReducer,
  visibleContent: changeVisibleContent,
});

const store = createStore(rootReduce, applyMiddleware(thunk));

export default store;
