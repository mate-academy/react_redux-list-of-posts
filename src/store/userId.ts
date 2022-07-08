import { AnyAction } from 'redux';

const USER_ID = 'USER_ID';

export const setUserId = (userId: number) => ({ type: USER_ID, userId });

export const userIdReducer = (userId = 0, action: AnyAction) => {
  switch (action.type) {
    case USER_ID:
      return action.userId;
    default:
      return userId;
  }
};
