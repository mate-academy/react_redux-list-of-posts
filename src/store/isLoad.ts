import { AnyAction } from 'redux';

const IS_LOAD = 'IS_LOAD';

export const selectors = {
  getIsload: (state: RootState) => state.isLoad,
};

export const actions = {
  setIsLoad: (isLoad: boolean) => ({ type: IS_LOAD, isLoad }),
};

export const rootReducer = (state = { isLoad: true }, action: AnyAction) => {
  switch (action.type) {
    case IS_LOAD:
      return {
        ...state,
        isLoad: action.isLoad,
      };
    default:
      return state;
  }
};
