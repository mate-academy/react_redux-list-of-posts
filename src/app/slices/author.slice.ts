import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUser } from '../../api/users';

export interface AuthorState {
  author: User | null;
}

const initialState: AuthorState = {
  author: null,
};

export const init = createAsyncThunk('author/fetch', (userId: number) => {
  return getUser(userId);
});

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.fulfilled, (state, action) => {
      state.author = action.payload;
    });
  },
});

export default authorSlice.reducer;
