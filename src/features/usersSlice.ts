import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

export interface UsersState {
  items: User[];
  loaded: boolean;
  hasError: boolean;
  selectedUserId: number;
}

const initialState: UsersState = {
  items: [],
  loaded: false,
  hasError: false,
  selectedUserId: 0,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => ({
      ...state,
      items: action.payload,
      loaded: true,
      hasError: false,
    }),
    setUsersError: state => ({
      ...state,
      hasError: true,
      loaded: true,
    }),
    setSelectedUserId: (state, action: PayloadAction<number>) => ({
      ...state,
      selectedUserId: action.payload,
    }),
  },
});

export const { setUsers, setUsersError, setSelectedUserId } =
  usersSlice.actions;
export default usersSlice.reducer;
