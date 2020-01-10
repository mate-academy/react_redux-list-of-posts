import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { postReducer } from './posts';
import { loadingReducer } from './loading';
import { loadedReducer } from './loaded';
import { inputReducer } from './inputValue';

const rootReducer = combineReducers({
  posts: postReducer,
  isLoaded: loadedReducer,
  loading: loadingReducer,
  query: inputReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
