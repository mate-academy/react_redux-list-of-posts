import { RootState } from '../../app/store';

export const selecteUsers = (state:RootState) => state.users.listUsers;
export const selecedUser = (state:RootState) => state.users.selectUser;
