import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUser } from "../../api/users";
import { User } from "../../types/User";

export const loadUser = createAsyncThunk<User, number>('/author', async (id) => await getUser(id))

export const authorSlice = createSlice({
  name: 'author',
  initialState: null as User | null,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => { return action.payload },
  },
  extraReducers(builder) {
    builder.addCase(loadUser.fulfilled, (state, action) => {
      return action.payload;
    })
  },
});

export default authorSlice.reducer;
export const { setAuthor } = authorSlice.actions;
