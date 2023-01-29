/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export interface UserState {
  users: User[];
  selectedUser: User | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  users: [],
  selectedUser: null,
  status: 'idle',
};

export const getAllUsers = createAsyncThunk('user/getAll', async () => {
  const users = await getUsers();

  return users;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    selectUser: (state: UserState, action: PayloadAction<User>) => {
      const user = action.payload;

      state.selectedUser = user;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllUsers.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        getAllUsers.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.status = 'idle';
          state.users = [...action.payload];
        },
      )
      .addCase(getAllUsers.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const { selectUser } = userSlice.actions;
export default userSlice.reducer;
