import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type UsersState = {
  users: User[];
  loading: boolean;
};

const initialState: UsersState = {
  users: [],
  loading: false,
};

export const UsersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      return {
        ...state,
        users: action.payload,
      };
    },
    setLoading(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
});

export const { setUsers, setLoading } = UsersSlice.actions;
export default UsersSlice.reducer;
