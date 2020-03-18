import { combineReducers } from 'redux';
import { loadReducer } from './loadReducer';
import { queryReducer } from './queryReducer';
import { dataReducer } from './dataReducer';

export const rootReducer = combineReducers({
  loadReducer,
  queryReducer,
  dataReducer,
});
