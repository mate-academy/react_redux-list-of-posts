import { AnyAction } from 'redux';

// Action types
const LOAD_COMPLETED = 'LOAD_COMPLETED';

// Action creators
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
