import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsers } from "../api/users";
import { User } from "../types/User";

export const usersFetch = createAsyncThunk('users/fetch', async () => {
  return await getUsers();
});

export interface UserState {
  users: User[],
  selectedUser: User | null,
};

const initialState: UserState = {
  users: [],
  selectedUser: null,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    selectedUser: (state, action: PayloadAction<User | null>) => {
      return {...state, selectedUser: action.payload}
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(usersFetch.fulfilled, (state, action) => {
        return { 
          ...state,
          users: action.payload,
        }
      })
  }

});

export default userSlice.reducer;
export const { selectedUser } = userSlice.actions;
