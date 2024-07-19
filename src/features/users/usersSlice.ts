import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { User } from '../../types/User';

export const selectUsers = (state: RootState) => state.users.users;

export interface UsersState {
  users: User[];
}

export const initialState: UsersState = {
  users: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      return {
        ...state,
        users: action.payload,
      };
    },
  },
});

export const { setUsers } = usersSlice.actions;

export default usersSlice.reducer;
