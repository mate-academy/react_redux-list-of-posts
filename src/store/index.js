import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { postReducer } from './posts';
import { loadingReducer } from './loading';
import { loadedReducer } from './loaded';

const rootReducer = combineReducers({
  posts: postReducer,
  isLoaded: loadedReducer,
  loading: loadingReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
