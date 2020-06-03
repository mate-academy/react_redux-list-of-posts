import { AnyAction } from 'redux';


const SET_QUERY = 'SET_QUERY';

export const setQuery = (query: string) => ({ type: SET_QUERY, query });

const reducer = (query = '', action: AnyAction) => {
  switch (action.type) {
    case SET_QUERY:
      return action.query.toLowerCase();

    default:
      return query;
  }
};

export default reducer;
