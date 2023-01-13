import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { fetchUsers } from './usersAsync';

type UsersState = {
  users: User[] | null,
  selectedUser: User | null,
  error: string,
};

const initialState: UsersState = {
  users: null,
  selectedUser: null,
  error: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    changeAuthor: (state: UsersState, action: PayloadAction<User>) => ({
      ...state,
      selectedUser: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder
    // fetch users
      .addCase(fetchUsers.fulfilled,
        (state: UsersState, action: PayloadAction<User[]>) => ({
          ...state,
          users: action.payload,
        }));
  },
});

export const usersAction = usersSlice.actions;
export default usersSlice.reducer;
