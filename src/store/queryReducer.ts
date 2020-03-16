import { AnyAction } from 'redux';
import { SET_QUERY } from './actionTypes';

export const queryReducer = (state = [], action: AnyAction) => {
  switch (action.type) {
    case SET_QUERY:
      return action.payload;

    default:
      return state;
  }
};
