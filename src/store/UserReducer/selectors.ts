import { State } from '..';

export const getUserSelector = (state: State) => {
  return state.UserReducer.user;
};
