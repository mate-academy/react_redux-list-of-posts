import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UsersState = {
  users: User[],
  loaded: boolean,
  hasError: string,
  selectedUser: User | null,
};

const initialState: UsersState = {
  users: [],
  loaded: false,
  hasError: '',
  selectedUser: null,
};

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      return {
        ...state,
        users: action.payload,
        loaded: false,
      };
    });
    builder.addCase(init.rejected, (state) => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
      // eslint-disable-next-line no-param-reassign
      state.hasError = 'Error';
    });
  },
});

export const { actions } = usersSlice;
export default usersSlice.reducer;
