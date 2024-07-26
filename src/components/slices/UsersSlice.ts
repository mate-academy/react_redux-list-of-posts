import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export type UserState = {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
};

const initialState: UserState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
};

export const users = createAsyncThunk(`/users`, () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      const currentState = state;

      currentState.users = action.payload;
    },
    setSelectedUser(state, action: PayloadAction<User>) {
      const currentState = state;

      currentState.selectedUser = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(users.pending, state => {
      const currentState = state;

      currentState.loading = true;
      currentState.error = null;
    });
    builder.addCase(users.fulfilled, (state, action) => {
      const currentState = state;

      currentState.loading = false;
      currentState.users = action.payload;
    });
    builder.addCase(users.rejected, state => {
      const currentState = state;

      currentState.loading = false;
      currentState.error = 'An error occurred while fetching users.';
    });
  },
});

export const { setUsers, setSelectedUser } = usersSlice.actions;
export default usersSlice.reducer;
