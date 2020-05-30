import { AnyAction } from 'redux';

const QUERY = 'QUERY';

export const setQuery = (query: string) => ({ type: QUERY, query });

const queryReducer = (state = '', action: AnyAction) => {
  switch (action.type) {
    case QUERY:
      return action.query;

    default:
      return state;
  }
};

export default queryReducer;
