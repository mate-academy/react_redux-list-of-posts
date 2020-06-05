import { AnyAction } from 'redux';
import { HANDLE_ERROR_LOADING } from './actionTypes';

export const hanldeErrorLoad = () => ({ type: HANDLE_ERROR_LOADING });

const reducer = (hasErrors = false, action: AnyAction) => {
  switch (action.type) {
    case HANDLE_ERROR_LOADING:
      return true;
    default:
      return hasErrors;
  }
};

export default reducer;
