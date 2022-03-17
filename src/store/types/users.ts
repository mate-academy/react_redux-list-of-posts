export interface UsersState {
  users: User [];
  loading: boolean;
  error: string | null;
  selectedUserId: number | null;
}

export enum UsersActionTypes {
  FETCH_USERS = 'FETCH_USERS',
  FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS',
  FETCH_USERS_ERROR = 'FETCH_USERS_ERROR',
  SET_SELECTED_USERID = 'SET_SELECTED_USERID',
}

export interface FetchUsersAction {
  type: UsersActionTypes.FETCH_USERS,
}

export interface FetchUsersSuccessAction {
  type: UsersActionTypes.FETCH_USERS_SUCCESS,
  payload: User[],
}

export interface FetchUsersErrorAction {
  type: UsersActionTypes.FETCH_USERS_ERROR,
  payload: string,
}

export interface SetSelectedUserId {
  type: UsersActionTypes.SET_SELECTED_USERID,
  payload: number,
}

export type UsersAction =
FetchUsersAction
| FetchUsersSuccessAction
| FetchUsersErrorAction
| SetSelectedUserId;
