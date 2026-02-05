import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsers } from "../../api/users";
import { User } from "../../types/User";

  export const usersThunk = createAsyncThunk(
    'users/fetch',
   () => {
      return getUsers()
    }
  )

export const usersSlice = createSlice({
  name: 'users',
  initialState: {items: [] as User[], loaded: false, hasError: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(usersThunk.pending, state => {
      state.loaded = false;
      state.hasError = false;
    })
    builder.addCase(usersThunk.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
      state.hasError = true;
    })
    builder.addCase(usersThunk.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    })
  }
})

export default usersSlice.reducer;
