import { Action } from "redux";

const SET_QUERY = 'SET_QUERY';

type SetQueryAction = Action<typeof SET_QUERY> & {
  query: string
};

export const setQuery = (query: string): SetQueryAction => ({
  type: SET_QUERY,
  query
});

type AllowedActions = SetQueryAction;

const reducer = (query = '', action: AllowedActions): string => {
  switch (action.type) {
    case SET_QUERY:
      return action.query

    default:
      return query;
  }
}

export default reducer;
