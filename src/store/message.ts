import { AnyAction } from 'redux';

const SET_MESSAGE = 'SET_MESSAGE';

export const setMessage = (message: string) => ({ type: SET_MESSAGE, message });

const reducer = (message = '', action: AnyAction) => {
  switch (action.type) {
    case SET_MESSAGE:
      return action.message;
    default:
      return message;
  }
};

export default reducer;
