import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

export interface InitialState {
  users: User[];
  selectedUser: User | null;
}

const initialState: InitialState = {
  users: [],
  selectedUser: null,
};

export const usersInit = createAsyncThunk('users/fetchUsers', async () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    selectUser: (state: InitialState, action: PayloadAction<User>) => ({
      ...state,
      selectedUser:
        state.users.find(user => user.id === action.payload.id) ?? null,
    }),
  },
  extraReducers: builder => {
    builder.addCase(usersInit.fulfilled, (state, action) => ({
      ...state,
      users: action.payload,
    }));
  },
});

export const usersActions = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
