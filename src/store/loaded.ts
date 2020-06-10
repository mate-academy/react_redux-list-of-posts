import { AnyAction } from 'redux';

const LOADED = 'LOADED';

export const setLoaded = () => ({ type: LOADED });

export const loadedReducer = (loaded = false, action: AnyAction) => {
  switch (action.type) {
    case LOADED:
      return true;
    default:
      return loaded;
  }
};
