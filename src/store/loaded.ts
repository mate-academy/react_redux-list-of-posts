import { AnyAction } from 'redux';

const IS_LOADED = 'isLoaded';
const FINISH_LOADED = 'notLoaded';

export const isLoaded = () => ({ type: IS_LOADED });
export const notLoaded = () => ({ type: FINISH_LOADED });

const reducer = (loaded = false, action: AnyAction) => {
  switch (action.type) {
    case IS_LOADED:
      return true;

    case FINISH_LOADED:
      return false;

    default:
      return loaded;
  }
};

export default reducer;
