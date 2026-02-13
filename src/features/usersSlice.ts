/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

const initialState = {
  items: [] as User[],
  loaded: false,
  hasError: false,
};

export const loadUsers = createAsyncThunk('users/fetchUsers', getUsers);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser(state, action) {
      state.items.push(action.payload);
    },
    removeUser(state, action) {
      return {
        ...state,
        items: state.items.filter(it => it.id !== action.payload.id),
      };
    },
    clearUsers() {
      return { ...initialState };
    },
  },
  extraReducers(builder) {
    builder.addCase(loadUsers.pending, state => {
      return {
        ...state,
        loaded: false,
        hasError: false,
      };
    });

    builder.addCase(loadUsers.fulfilled, (state, action) => {
      return { ...state, items: action.payload, loaded: true };
    });

    builder.addCase(loadUsers.rejected, state => {
      return {
        ...state,
        loaded: true,
        hasError: true,
      };
    });
  },
});

export const { addUser, removeUser, clearUsers } = usersSlice.actions;
export default usersSlice.reducer;
