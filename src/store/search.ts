import { AnyAction } from 'redux';

// Action types
const SET_QUERY = 'SET_QUERY';

// Action creators
export const setQuery = (query: string) => ({ type: SET_QUERY, query });

const reducer = (query = '', action: AnyAction) => {
  switch (action.type) {
    case SET_QUERY:
      return action.query;

    default:
      return query;
  }
};

export default reducer;
