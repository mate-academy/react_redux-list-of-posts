import { AnyAction } from 'redux';

// Action types
const QUERY = 'QUERY';

// Action creators

export const setQuery = (query: string) => (
  {
    type: QUERY,
    query,
  });

// query reducer receives only the `posts.message` part, but not the entire Redux state
const reducer = (query = '', action: AnyAction) => {
  switch (action.type) {
    case QUERY:
      return action.query;

    default:
      return query;
  }
};

export default reducer;
