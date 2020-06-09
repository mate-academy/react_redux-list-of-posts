import { AnyAction } from 'redux';

const LOAD_COMPLETED = 'LOAD_COMPLETED';

export const setIsLoadCompleted = () => ({ type: LOAD_COMPLETED });

const reducer = (isLoaded = false, action: AnyAction) => {
  switch (action.type) {
    case LOAD_COMPLETED:
      return true;
    default:
      return isLoaded;
  }
};

export default reducer;
