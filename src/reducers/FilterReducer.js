const CHANGE_QUERY = 'CHANGE_QUERY';

export const changeQuery = value => ({
  type: CHANGE_QUERY, value,
});

const filterReducer = (state = '', action) => {
  switch (action.type) {
    case CHANGE_QUERY: return action.value;
    default: return state;
  }
};

export default filterReducer;
