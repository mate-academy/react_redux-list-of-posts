/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUser } from '../api/users';

type UserState = {
  user: User | null;
  loading: boolean;
  error: boolean;
};

const initialState: UserState = {
  user: null,
  loading: false,
  error: false,
};

export const loadUser = createAsyncThunk<User, number>(
  'author/fetch',
  async (id, { rejectWithValue }) => {
    try {
      const author = await getUser(id);

      return author;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadUser.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(loadUser.rejected, state => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { actions } = authorSlice;
export default authorSlice.reducer;
