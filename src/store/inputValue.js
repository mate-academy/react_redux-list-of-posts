import { CHANGE_QUERY } from '../actions';

export const getValue = state => state.query;

export const inputReducer = (query = '', action) => {
  if (action.type === CHANGE_QUERY) {
    return action.query;
  }

  return query;
};
