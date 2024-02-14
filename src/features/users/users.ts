import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsers } from "../../api/users";

export const loadUsers = createAsyncThunk(
  'users/load',
  async () => {
    try {
      return await getUsers();
    } catch (error) {
      return error;
    }
  },
);

const initialState = {
  users: [],
  isLoading: true,
  errorMessage: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(loadUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = 'An error occured';
      });
  },
})

export default usersSlice.reducer;
