import { RootState } from '../store';

export const selectUsers = (state: RootState) => state.users.users;
export const selectSelectedUser
  = (state: RootState) => state.users.selectedUser;
