export const SET_FILTER = 'SET_FILTER';

export const setFilterAC = value => ({
  type: SET_FILTER, value,
});

const filterReducer = (filter = '', action) => {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return filter;
  }
};

export default filterReducer;
