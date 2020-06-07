import { AnyAction } from 'redux';
import {
  START_LOADING_DATA,
  SUCCESSFUL_LOADING,
  HANDLE_ERROR_LOADING,
} from './actionTypes';

export const startLoadingData = () => ({ type: START_LOADING_DATA });
export const handleSuccessfulLoad = () => ({ type: SUCCESSFUL_LOADING });
export const hanldeErrorLoad = () => ({ type: HANDLE_ERROR_LOADING });

const reducer = (loading = false, action: AnyAction) => {
  switch (action.type) {
    case START_LOADING_DATA:
      return true;
    case SUCCESSFUL_LOADING:
      return false;
    case HANDLE_ERROR_LOADING:
      return false;
    default:
      return loading;
  }
};

export default reducer;
