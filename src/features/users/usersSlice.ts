import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

const initialState = {
  users: [] as User[] | [],
  loaded: false,
  hasError: false,
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
      loaded: true,
    }));
    builder.addCase(usersLoad.fulfilled, (state, action) => ({
      ...state,
      users: action.payload,
      loaded: false,
    }));
    builder.addCase(usersLoad.rejected, state => ({
      ...state,
      hasError: true,
      loaded: false,
    }));
  },
});

export default usersSlice.reducer;
export const { actions } = usersSlice;
