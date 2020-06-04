import { AnyAction } from 'redux';

// Action types
const QUERY = 'QUERY';

// Action creators
export const setQuery = (query: string) => (
  {
    type: QUERY,
    query,
  }
);

const reducer = (query = '', action: AnyAction) => {
  switch (action.type) {
    case QUERY:
      return action.query;

    default:
      return query;
  }
};

export default reducer;
