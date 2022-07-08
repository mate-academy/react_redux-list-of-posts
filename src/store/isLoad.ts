import { AnyAction } from 'redux';

const IS_LOAD = 'IS_LOAD';

export const setIsLoad = (isLoad: boolean) => ({ type: IS_LOAD, isLoad });

export const isLoadReducer = (isLoad = true, action: AnyAction) => {
  switch (action.type) {
    case IS_LOAD:
      return action.isLoad;
    default:
      return isLoad;
  }
};
