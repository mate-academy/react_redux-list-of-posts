/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUser, getUsers } from '../../api/users';

export interface UsersState {
  value: User[];
  status: 'idle' | 'loading' | 'failed';
  selectedUser: User | null;
  selectedUserStatus: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
  value: [],
  status: 'idle',
  selectedUser: null,
  selectedUserStatus: 'idle',
};

export const fetchUsers = createAsyncThunk<User[]>('users/fetch', async () => {
  const value = await getUsers();

  return value;
});

export const fetchUser = createAsyncThunk<User, number>(
  'users/fetchOne',
  async id => {
    const value = await getUser(id);

    return value;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(fetchUsers.rejected, state => {
        state.status = 'failed';
      })
      .addCase(fetchUser.pending, state => {
        state.selectedUserStatus = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.selectedUserStatus = 'idle';
        state.selectedUser = action.payload;
      })
      .addCase(fetchUser.rejected, state => {
        state.selectedUserStatus = 'failed';
      });
  },
});

export default usersSlice.reducer;
