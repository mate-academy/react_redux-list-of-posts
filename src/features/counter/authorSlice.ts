/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUser } from '../../api/users';

type AuthorState = {
  items: User | null;
  loaded: boolean;
  hasError: string | null;
};

const initialState: AuthorState = {
  items: null,
  loaded: false,
  hasError: null,
};

export const fetchAuthorThunk = createAsyncThunk<User, number>(
  `users/fetchAuthor`,
  async id => {
    return getUser(id);
  },
);

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      state.items = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchAuthorThunk.pending, state => {
        state.loaded = true;
        state.hasError = null;
      })
      .addCase(fetchAuthorThunk.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = false;
      })
      .addCase(fetchAuthorThunk.rejected, (state, action) => {
        state.loaded = false;
        state.hasError = action.error.message || 'Failed to load author';
      });
  },
});

export default authorSlice.reducer;
export const { setAuthor } = authorSlice.actions;
