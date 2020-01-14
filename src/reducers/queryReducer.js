import { SET_QUERY } from '../constants';

export const setQuery = query => ({
  type: SET_QUERY,
  query,
});

const queryReducer = (query = '', action) => {
  if (action.type === SET_QUERY) {
    return action.query;
  }

  return query;
};

export default queryReducer;
