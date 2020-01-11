const SET_SEARCH_QUERY = 'searchQuery';

export const setSearchQuery = searchQuery => ({
  type: SET_SEARCH_QUERY,
  searchQuery,
});

const searchQueryReducer = (searchQuery = '', action) => {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return action.searchQuery;
    default:
      return searchQuery;
  }
};

export default searchQueryReducer;
