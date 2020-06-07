import { AnyAction } from 'redux';
import { HANDLE_ERROR_LOADING, DISCHARGE_ERROR } from './actionTypes';

export const hanldeErrorLoad = () => ({ type: HANDLE_ERROR_LOADING });
export const dischargeError = () => ({ type: DISCHARGE_ERROR });

const reducer = (hasErrors = false, action: AnyAction) => {
  switch (action.type) {
    case HANDLE_ERROR_LOADING:
      return true;
    case DISCHARGE_ERROR:
      return false;
    default:
      return hasErrors;
  }
};

export default reducer;
