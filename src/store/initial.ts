import { AnyAction } from 'redux';

const INITIAL = 'INITIAL';

export const setLoaded = () => ({ type: INITIAL });

const reducer = (initial = false, action: AnyAction) => {
  switch (action.type) {
    case INITIAL:
      return true;

    default:
      return initial;
  }
};

export default reducer;
