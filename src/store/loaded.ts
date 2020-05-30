import { AnyAction } from 'redux';

const LOADED = 'LOADED';

export const setLoaded = () => ({ type: LOADED });

const reducer = (loaded = false, action: AnyAction) => {
  switch (action.type) {
    case LOADED:
      return true;

    default:
      return loaded;
  }
};

export default reducer;
