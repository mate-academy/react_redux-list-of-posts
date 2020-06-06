import { AnyAction } from 'redux';
import { LOADING_FINISH } from './index';

// Action types
export const SET_MESSAGE = 'SET_MESSAGE';

// Action creators
export const setMessage = (message: string) => ({ type: SET_MESSAGE, message });

// message reducer receives only the `state.message` part, but not the entire Redux state
const reducer = (message = 'Press to load', action: AnyAction) => {
  switch (action.type) {
    case SET_MESSAGE:
    case LOADING_FINISH:
      return action.message;
    default:
      return message;
  }
};

export default reducer;
