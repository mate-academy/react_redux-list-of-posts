import { AnyAction } from 'redux';

const LOAD_COMPLETED = 'LOAD_COMPLETE';

export const setLoadCompleted = () => ({ type: LOAD_COMPLETED });

const reducer = (isloadComplete = false, action: AnyAction) => {
  switch (action.type) {
    case LOAD_COMPLETED:
      return true;
    default:
      return isloadComplete;
  }
};

export default reducer;
