import { AnyAction } from 'redux';
import { PostType } from '../types';

// Action types
export const FILTER_FIELD_CHANGE = 'FILTER_FIELD_CHANGE';

// Action creators
export const filterFieldChange = (filterField: string, posts: PostType[]) => ({ type: FILTER_FIELD_CHANGE, filterField, posts });

const reducer = (filterField = "", action: AnyAction) => {
  switch (action.type) {
    case FILTER_FIELD_CHANGE:
      return action.filterField;
    default:
      return filterField;
  }
};

export default reducer;
