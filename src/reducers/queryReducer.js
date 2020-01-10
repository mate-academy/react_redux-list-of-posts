export const SET_QUERY = 'SET_QUERY';

export const setQuery = query => ({
  type: SET_QUERY,
  query,
});

const queryReducer = (query = '', action) => {
  switch (action.type) {
    case SET_QUERY:
      return action.query;
    default:
      return query;
  }
};

export default queryReducer;
