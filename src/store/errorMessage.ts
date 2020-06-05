import { AnyAction } from 'redux';


const SET_MESSAGE = 'SET_MESSAGE';

export const setErrorMessage = (message: string) => ({ type: SET_MESSAGE, message });

const errorMessageReducer = (message = '', action: AnyAction) => {
  switch (action.type) {
    case SET_MESSAGE:
      return action.message;

    default:
      return message;
  }
};

export default errorMessageReducer;
