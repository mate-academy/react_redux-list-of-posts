import { AnyAction } from 'redux';
import { SET_LOADING } from './actionTypes';

export const loadingReducer = (state = false, action: AnyAction) => {
  switch (action.type) {
    case SET_LOADING:
      return action.payload;
    default:
      return state;
  }
};
