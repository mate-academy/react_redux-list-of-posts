import { AnyAction } from 'redux';

// Action types
const SET_USER_ID = 'SET_USER_ID';

// Action creators
export const setUserId = (userId: string) => ({ type: SET_USER_ID, userId });

const reducer = (userId = '0', action: AnyAction) => {
  switch (action.type) {
    case SET_USER_ID:
      return action.userId;

    default:
      return userId;
  }
};

export default reducer;
