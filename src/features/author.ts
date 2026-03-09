import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUser } from '../api/users';

type AuthorState = {
  author: User | null;
};

const initialState: AuthorState = {
  author: null,
};

export const init = createAsyncThunk('author/init', (userId: number) => {
  return getUser(userId);
});

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor(state, action: PayloadAction<User | null>) {
      state.author = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(init.fulfilled, (state, action) => {
      state.author = action.payload;
    });
  },
});

export default authorSlice.reducer;
export const { setAuthor } = authorSlice.actions;
