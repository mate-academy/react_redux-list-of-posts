import { AnyAction } from 'redux';

// Action types
const lOADED = 'lOADED';

// Action creators
export const setLoaded = () => ({ type: lOADED });

const loadedReducer = (loaded = false, action: AnyAction) => {
  switch (action.type) {
    case lOADED:
      return true;
    default:
      return loaded;
  }
};

export default loadedReducer;
