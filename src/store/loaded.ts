import { AnyAction } from 'redux';

const IS_LOADED = 'IS_LOADED';

export const setLoaded = () => ({ type: IS_LOADED });

const loadedReducer = (state = false, action: AnyAction) => {
  switch (action.type) {
    case IS_LOADED:
      return true;

    default:
      return state;
  }
};

export default loadedReducer;
