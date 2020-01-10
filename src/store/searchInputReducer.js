const SET_SEARCH_TERM = 'SET_SEARCH_TERM';

export const setSearchTermValue = searchTerm => ({
  type: SET_SEARCH_TERM,
  searchTerm,
});

const searchInputReducer = (state = '', action) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return action.searchTerm;
    default: return state;
  }
};

export default searchInputReducer;
