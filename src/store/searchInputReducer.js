const HANDLE_CHANGE = 'HANDLE_CHANGE';
const SET_SEARCH_TERM = 'SET_SEARCH_TERM';

export const handleChange = eventValue => ({
  type: HANDLE_CHANGE,
  eventValue,
});
export const getSearchTermValue = searchTerm => ({
  type: SET_SEARCH_TERM,
  searchTerm,
});

const searchInputReducer = (state = '', action) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return action.searchTerm;
    case HANDLE_CHANGE:
      return action.eventValue.trim().toLowerCase();
    default: return state;
  }
};

export default searchInputReducer;
