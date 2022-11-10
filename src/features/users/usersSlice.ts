/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { User } from '../../types/User';

export interface UsersState {
  value: User[];
  currentUser: User | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
  value: [],
  currentUser: null,
  status: 'idle',
};

export const getAllUsersAsync = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const value = await getUsers();

    return value;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    clear: (state) => {
      state.value = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllUsersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(getAllUsersAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setCurrentUser, clear } = usersSlice.actions;
export const selectUsers = (state: RootState) => state.users.value;
export const selectCurrentUser = (state: RootState) => state.users.currentUser;

export default usersSlice.reducer;
