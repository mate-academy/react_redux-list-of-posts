const SET_QUERY = 'SET_QUERY';

export const setQuery = query => ({
  type: SET_QUERY,
  query,
});

const setQueryReducer = (search = '', action) => {
  switch (action.type) {
    case SET_QUERY:
      return action.query;
    default:
      return search;
  }
};

export default setQueryReducer;
