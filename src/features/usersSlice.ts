import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type UsersState = {
  items: User[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: UsersState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.items = action.payload;
      state.loaded = true;
      state.hasError = false;
    },
    setError(state) {
      state.hasError = true;
      state.loaded = true;
    },
  },
});

export const { setUsers, setError } = usersSlice.actions;
export default usersSlice.reducer;
