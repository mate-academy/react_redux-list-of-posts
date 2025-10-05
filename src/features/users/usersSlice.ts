import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../types/User";
import { getUsers } from "../../api/users";


type UserState = {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
};

const initialState: UserState = {
  users: [],
  status: "idle",
};

export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  "users/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUsers();
      return (res) as User[];
    } catch (err) {
      return rejectWithValue("Network error");
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, state => {
        state.status = "failed";
      });
  },
});



export default usersSlice.reducer;