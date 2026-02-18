import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUser } from '../api/users';

type AuthorState = {
  author: User | null;
  selectedUserId: number | null;
  loading: boolean;
  error: string;
};

const initialState: AuthorState = {
  author: null,
  selectedUserId: null,
  loading: false,
  error: '',
};

export const fetchAuthor = createAsyncThunk(
  'author/fetchAuthor',
  async (userId: number) => {
    const user = await getUser(userId);

    return user;
  },
);

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setSelectedUserId: (state, action) => {
      state.selectedUserId = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAuthor.pending, state => {
        state.error = '';
        state.loading = true;
      })
      .addCase(fetchAuthor.fulfilled, (state, action) => {
        state.author = action.payload;
        state.loading = false;
      })
      .addCase(fetchAuthor.rejected, (state, action) => {
        state.error = action.error.message || '';
        state.loading = false;
      });
  },
});

export const { setSelectedUserId } = authorSlice.actions;

export default authorSlice.reducer;
