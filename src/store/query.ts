import { AnyAction } from 'redux';
import { SET_QUERY } from './actionTypes';

export const handleSearchQuery = (searchQuery: string) => ({ type: SET_QUERY, query: searchQuery });

const reducer = (query = '', action: AnyAction) => {
  switch (action.type) {
    case SET_QUERY: {
      return action.query;
    }

    default:
      return query;
  }
};

export default reducer;
