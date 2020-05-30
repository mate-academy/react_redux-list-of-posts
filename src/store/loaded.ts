import { AnyAction } from 'redux';

const LOADED = 'LOADED';

export const setLoaded = () => ({ type: LOADED });

const loadedReducer = (state = false, action: AnyAction) => {
  switch (action.type) {
    case LOADED:
      return true;

    default:
      return state;
  }
};

export default loadedReducer;
