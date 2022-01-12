import { IUser } from '../../types/IUser';

export interface AuthState {
  isAuth: boolean,
  user: IUser,
  isLoading: boolean,
  error: string,
}

export enum AuthActionsEnum {
  SET_AUTH = 'SET_AUTH',
  SET_ERROR = 'SET_ERROR',
  SET_USER = 'SER_USER',
  SET_IS_LOADING = 'SET_IS_LOADING',
}

interface SetAuthAction {
  type: AuthActionsEnum.SET_AUTH;
  payload: boolean
}

interface SetErrorAction {
  type: AuthActionsEnum.SET_ERROR;
  payload: string
}

interface SetUserAction {
  type: AuthActionsEnum.SET_USER;
  payload: IUser
}

interface SetIsLoadingAction {
  type: AuthActionsEnum.SET_IS_LOADING;
  payload: boolean
}

export type AuthAction =
  SetAuthAction | SetErrorAction | SetUserAction | SetIsLoadingAction;
