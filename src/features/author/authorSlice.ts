/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUser } from '../../api/users';

const initialState: { author: User | null } = {
  author: null,
};

export const getAuthorFromServer = createAsyncThunk(
  'author/getAuthor',
  async (userId: number) => {
    const value = await getUser(userId);

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
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
