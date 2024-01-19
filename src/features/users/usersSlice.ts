import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export type UsersState = {
  users: User[]
};

const initialState: UsersState = {
  users: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set: (_state, action: PayloadAction<User[]>) => {
      return { users: action.payload };
    },
  },
});

export const { actions } = usersSlice;
export default usersSlice.reducer;
