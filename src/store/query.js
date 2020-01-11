const ACTION_TYPE_SET_QUERY = 'setQuery';

export const createActionSetQuery = payload => ({
  type: ACTION_TYPE_SET_QUERY,
  payload,
});

const queryReducer = (query = '', action) => {
  switch (action.type) {
    case ACTION_TYPE_SET_QUERY:
      return action.payload;

    default:
    return query;
  }
};

export default queryReducer;
