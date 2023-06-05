import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type InitialState = {
  users: User[],
  hasError: boolean,
};

const initialUsers: InitialState = {
  users: [],
  hasError: false,
};

const userSlice = createSlice({
  name: 'users',
  initialState: initialUsers,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.users = action.payload ?? state.users;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = action.payload;
      console.log(action.payload);
    },
  },
});

export default userSlice.reducer;
export const { setUsers, setError } = userSlice.actions;
