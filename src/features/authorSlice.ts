import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUser } from '../api/users';
import { User } from '../types/User';

type AuthorState = {
  author: User | null;
  loading: boolean;
  error: string;
};

const initialState: AuthorState = {
  author: null,
  loading: false,
  error: '',
};

export const fetchAuthor = createAsyncThunk(
  'author/fetch',
  async (id: number) => {
    return getUser(id);
  },
);

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAuthor.pending, state => {
      state.error = '';
      state.loading = true;
    });
    builder.addCase(fetchAuthor.fulfilled, (state, action) => {
      state.author = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAuthor.rejected, (state, action) => {
      state.error = action.error.message || '';
      state.loading = false;
    });
  },
});
