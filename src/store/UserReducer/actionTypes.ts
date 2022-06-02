import { User } from '../../types/User';

export enum UserActionTypes {
  SetUser = 'SET_USER',
}

export interface SetUserAction {
  type: UserActionTypes.SetUser;
  user: User | null;
}

export type UserActions = SetUserAction;
