const ACTION_TYPE_SET_QUERY = 'setQuery';

export const setQuery = query => ({
  type: ACTION_TYPE_SET_QUERY,
  query,
});

const queryReducer = (query = '', action) => {
  switch (action.type) {
    case ACTION_TYPE_SET_QUERY:
      return action.query;
    default:
      return query;
  }
};

export default queryReducer;
