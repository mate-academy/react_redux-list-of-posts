import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  initialState: { items: [] as User[], loaded: false, hasError: false, selectedUserId: null as number | null },
  reducers: {
    setSelectedUser: (state, action: PayloadAction<number | null>) => {
      state.selectedUserId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(usersThunk.pending, state => {
      state.loaded = false;
      state.hasError = false;
    })
    builder.addCase(usersThunk.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
      state.hasError = false;
    })
    builder.addCase(usersThunk.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    })
  }
})

export default usersSlice.reducer;
