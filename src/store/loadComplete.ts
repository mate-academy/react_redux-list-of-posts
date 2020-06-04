import { AnyAction } from 'redux';

// Action types
const LOAD_COMPLETE = 'LOAD_COMPLETE';

// Action creators

export const setLoadComplete = () => ({ type: LOAD_COMPLETE });

// query reducer receives only the `posts.message` part, but not the entire Redux state
const reducer = (isloadComplete = false, action: AnyAction) => {
  switch (action.type) {
    case LOAD_COMPLETE:
      return true;
    default:
      return isloadComplete;
  }
};

export default reducer;
