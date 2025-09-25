import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

const initialState = {
  users: [] as User[] | [],
  loader: false as boolean,
  error: '' as string,
};

export const usersLoad = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      return { ...state, users: action.payload };
    },
  },
  extraReducers: builder => {
    builder.addCase(usersLoad.pending, state => ({
      ...state,
      loader: true,
    }));
    builder.addCase(usersLoad.fulfilled, (state, action) => ({
      ...state,
      users: action.payload,
      loader: false,
    }));
    builder.addCase(usersLoad.rejected, state => ({
      ...state,
      error: 'Something went wrong!',
      loader: false,
    }));
  },
});

export const { actions } = usersSlice;
