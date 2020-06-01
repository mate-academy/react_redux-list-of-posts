import { AnyAction } from 'redux';

// Action types
export const SET_FILTER_FIELD = 'SET_FILTER_FIELD';

// Action creators
export const setFilterFieldCreator = (filterField: string) => ({ type: SET_FILTER_FIELD, filterField });

const reducer = (filterField = "", action: AnyAction) => {
  switch (action.type) {
    case SET_FILTER_FIELD:
      return action.filterField;
    default:
      return filterField;
  }
};

export default reducer;
