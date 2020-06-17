import { Action } from 'redux';

const FILTER_QUERY = 'FILTER_QUERY';

type FilterQuery = Action<typeof FILTER_QUERY> & { filterQuery: string };

export const setFilterQuery = (filterQuery: string): FilterQuery => ({
  type: FILTER_QUERY,
  filterQuery,
});

const filterReducer = (filterQuery = '', action: FilterQuery) => {
  switch (action.type) {
    case FILTER_QUERY:
      return action.filterQuery;

    default:
      return filterQuery;
  }
};

export default filterReducer;
