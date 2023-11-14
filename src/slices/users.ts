/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';

export interface UsersState {
  users: User[];
  selectedUser: User | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
  users: [],
  selectedUser: null,
  status: 'idle',
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const users = await getUsers();

    return users;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    selectUser: (state, action: PayloadAction<number>) => {
      state.selectedUser = state.users.find(user => {
        return user.id === action.payload;
      }) || null;
    },
    clearUser: (state) => {
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = 'idle';
      state.users = action.payload;
    });
  },
});

export const usersSelector = (state: RootState) => state.users;

export const { selectUser, clearUser } = usersSlice.actions;
export default usersSlice.reducer;
