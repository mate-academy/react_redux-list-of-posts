import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { fetchUsers } from './usersAPI';

export interface UserState {
  allUsers: User[] | null;
  selectedUser: User | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  allUsers: null,
  selectedUser: null,
  status: 'idle',
};

export const getUsersAsync = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const users = await fetchUsers();

    // The value we return becomes the `fulfilled` action payload
    return users;
  },
);

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      // eslint-disable-next-line no-param-reassign
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.pending, (state) => {
        // eslint-disable-next-line no-param-reassign
        state.status = 'loading';
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.status = 'idle';
        // eslint-disable-next-line no-param-reassign
        state.allUsers = action.payload;
      })
      .addCase(getUsersAsync.rejected, (state) => {
        // eslint-disable-next-line no-param-reassign
        state.status = 'failed';
      });
  },
});

export const { setUser } = usersSlice.actions;
export default usersSlice.reducer;
