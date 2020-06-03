import { AnyAction } from 'redux';

// Action types
const SET_MESSAGE = 'SET_MESSAGE';

// Action creators
export const setMessage = (message: string) => ({ type: SET_MESSAGE, message });

// message reducer receives only the `state.message` part, but not the entire Redux state
const reducer = (message = false, action: AnyAction) => {
  switch (action.type) {
    case SET_MESSAGE:
      return action.message;
    default:
      return message;
  }
};

export default reducer;
