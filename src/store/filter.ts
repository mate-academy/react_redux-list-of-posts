import { AnyAction } from 'redux';

const FILTER = 'FILTER';

export const setFilter = (query: string) => ({
  type: FILTER,
  query,
});

export const filterReducer = (query = '', action: AnyAction) => {
  switch (action.type) {
    case FILTER:
      return action.query;
    default:
      return query;
  }
};
