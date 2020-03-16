import { AnyAction } from 'redux';
import { SET_ERROR } from './actionTypes';

export const errorReducer = (state = false, action: AnyAction) => {
  switch (action.type) {
    case SET_ERROR:
      return action.payload;
    default:
      return state;
  }
};
