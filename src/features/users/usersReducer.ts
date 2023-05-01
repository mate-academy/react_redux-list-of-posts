import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

const initialState: { users: User[] } = {
  users: [],
};

export const initUserFromAPI = createAsyncThunk(
  'users/fetch',
  () => getUsers(),
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      initUserFromAPI.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        return { ...state, users: action.payload };
      },
    );
  },
});

export const usersReducer = usersSlice.reducer;
