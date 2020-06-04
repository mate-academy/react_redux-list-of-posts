import { AnyAction } from 'redux';

const CHANGE_QUERY = 'CHANGE_QUERY';

export const setQuery = (text: string) => ({ type: CHANGE_QUERY, text });

const reducer = (query = '', action: AnyAction) => {
  switch (action.type) {
    case CHANGE_QUERY:
      return action.text.toLowerCase();
    default:

      return query;
  }
};

export default reducer;
