/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUser } from '../api/users';
import { User } from '../types/User';

export interface AuthorState {
  author: User | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState : AuthorState = {
  author: null,
  status: 'idle',
};

export const authorAsync = createAsyncThunk(
  'author/fetchUser',
  async (userId: number) => {
    const data = await getUser(userId);

    return data;
  },
);

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    addAutor: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(authorAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(authorAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.author = action.payload;
      })
      .addCase(authorAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { addAutor } = authorSlice.actions;

export default authorSlice.reducer;
