import { AnyAction } from 'redux';

const VISIBILITY = 'VISIBILITY';

export const visibility = () => ({ type: VISIBILITY });

const reducer = (visibility= false, action: AnyAction) => {
  switch(action.type) {
    case VISIBILITY:
      return true;
    default:
      return visibility;
  };
};

export default reducer;
