import { AnyAction } from 'redux';
import { SET_IS_LOADED } from './actionTypes';

export const loadedReducer = (state = false, action: AnyAction) => {
  switch (action.type) {
    case SET_IS_LOADED:
      return action.payload;
    default:
      return state;
  }
};
