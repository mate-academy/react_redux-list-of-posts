import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type InitialState = {
  users: User[];
};

const initialState: InitialState = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.users = action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
