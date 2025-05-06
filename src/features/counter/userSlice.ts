import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type UsersState = {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string;
};

const initialState: UsersState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: '',
};
/* eslint-disable no-param-reassign */
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
  },
});

/* eslint-enable no-param-reassign */
export const { setUsers, setLoading, setSelectedUser } = usersSlice.actions;
export default usersSlice.reducer;
