import { AnyAction } from 'redux';

const IS_LOADED = 'isLoaded';
// const FINISH_LOADED = 'notLoaded';

export const setLoaded = (boolean: boolean) => ({ type: IS_LOADED, boolean });

const reducer = (loaded = false, action: AnyAction) => {
  switch (action.type) {
    case IS_LOADED:
      if (action.boolean === true) {
        return true;
      }

      return false;


    default:
      return loaded;
  }
};

export default reducer;
