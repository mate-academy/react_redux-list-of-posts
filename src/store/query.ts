import { AnyAction } from 'redux';

const QUERY = 'QUERY';

export const setQuery = (query: string) => ({ type: QUERY, query });

export const queryReducer = (query = '', action: AnyAction) => {
  switch (action.type) {
    case QUERY:
      return action.query;
    default:
      return query;
  }
};
