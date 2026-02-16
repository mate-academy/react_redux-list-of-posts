import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

export const fetchUsers = createAsyncThunk('usersSlice/fetch', async () => {
  const res = await getUsers();

  return res;
});

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        return {
          ...state,
          users: action.payload,
          error: null,
          loading: false,
        };
      })
      .addCase(fetchUsers.pending, state => {
        return {
          ...state,
          error: null,
          loading: true,
        };
      })
      .addCase(fetchUsers.rejected, state => {
        return {
          ...state,
          error: 'Error',
          loading: false,
        };
      });
  },
});

export default usersSlice.reducer;
