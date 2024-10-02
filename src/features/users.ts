import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {User} from "../types/User"
import {getUsers} from "../api/users";

export type usersState = {
  users: User[],
  userLoading: boolean,
  error: string,
};

const initialState: usersState = {
  users: [],
  userLoading: false,
  error: '',
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(userInit.pending, (state) => {
      state.userLoading = true;
    })
    .addCase(userInit.fulfilled, (state, action) => {
      state.users = action.payload;
      state.userLoading = false;
    })
    .addCase(userInit.rejected, (state) => {
      state.error = 'Error';
      state.userLoading = false;
    })
  }
});

export default usersSlice.reducer;

export const userInit = createAsyncThunk('users/fetch', () => {
  return getUsers();
});
