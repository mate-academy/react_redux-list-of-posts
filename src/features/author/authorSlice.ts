/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUser } from '../../api/users';
import { RootState } from '../../app/store';

export interface AuthorState {
  items: User | null;
  loaded: boolean;
  hasError: boolean;
}

const initialState: AuthorState = {
  items: null,
  loaded: false,
  hasError: false,
};

// I am honstly just coppying what I saw in documentation.
export const authorAsync = createAsyncThunk(
  'author/fetchAuthor',
  async (id: number) => {
    const value = getUser(id);

    return value;
  },
);

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      state.items = action.payload;
      state.loaded = true;
      state.hasError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(authorAsync.pending, state => {
        state.loaded = false; // Change status
        state.hasError = false;
      })
      .addCase(authorAsync.fulfilled, (state, action) => {
        state.loaded = true;
        state.hasError = false;
        state.items = action.payload; // Set posts
      })
      .addCase(authorAsync.rejected, state => {
        state.hasError = true; // Change status
        state.loaded = true;
      });
  },
});

export const authorUser = (state: RootState) => state.author.items;
export const authorLoaded = (state: RootState) => state.author.loaded;
export const authorHasError = (state: RootState) => state.author.hasError;
export const { setAuthor } = authorSlice.actions;

export default authorSlice.reducer;
