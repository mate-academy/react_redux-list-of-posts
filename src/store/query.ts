import { AnyAction } from 'redux';

const SET_QUERY = 'SET_QUERY';

export const setQuery = (value: string) => ({ type: SET_QUERY, value });

const reducer = (query = '', action: AnyAction) => {
  switch (action.type) {
    case SET_QUERY:
      return action.value;

    default:
      return query;
  }
};

export default reducer;
