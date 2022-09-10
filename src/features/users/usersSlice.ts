/* eslint-disable */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { RootState } from '../../app/store';
import { User } from '../../types/User';

export interface InitialState {
  users: User[],
  author: User | null,
  status: 'idle' | 'loading' | 'failed',
}

export const initialState: InitialState = {
  users: [],
  author: null,
  status: 'idle',
};

export const usersAsync = createAsyncThunk(
  'users/usersAsync',
  async () => {
    const response = await getUsers();

    return response;
  },
);

export const usersReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(usersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(usersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload;
      })
      .addCase(usersAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectUsers = (state: RootState) => state.users.users;

export default usersReducer.reducer;

export const { setAuthor } = usersReducer.actions;
