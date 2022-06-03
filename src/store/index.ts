import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import formReducer from './form';
import mainReducer from './main';

const reducer = combineReducers({
  mainState: mainReducer,
  formState: formReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(),
);

export default store;
