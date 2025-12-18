/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUser } from '../../api/users';

export interface AuthorState {
  author: User | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthorState = {
  author: null,
  status: 'idle',
};

export const fetchUser = createAsyncThunk<User, number>(
  'author/fetch',
  async id => {
    const value = await getUser(id);

    return value;
  },
);

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      state.author = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.author = action.payload;
      })
      .addCase(fetchUser.rejected, state => {
        state.status = 'failed';
      });
  },
});

export default authorSlice.reducer;
export const { setAuthor } = authorSlice.actions;
