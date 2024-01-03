import { RootState } from '../../app/store';

export const selectUsers = (state: RootState) => state.users.items;
