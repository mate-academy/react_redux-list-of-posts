import { AnyAction } from 'redux';

// Action types
const FILTER = 'FILTER';

// Action creators
export const setFilter = (query: string) => ({ type: FILTER, query });

const filterReducer = (filter = '', action: AnyAction) => {
  switch (action.type) {
    case FILTER:
      return action.query;
    default:
      return filter;
  }
};

export default filterReducer;
