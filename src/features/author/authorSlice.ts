/* eslint no-param-reassign: "error" */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUser } from '../../api/users';

type AuthorState = {
  author: User | null;
};

const initialState: AuthorState = {
  author: null,
};

export const getAsyncAuthor = createAsyncThunk(
  'author/fetchUser',
  async (userId: number) => {
    const user = await getUser(userId);

    return user;
  },
);

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(getAsyncAuthor.fulfilled, (state, action) => {
      state.author = action.payload;
    });
  },
});

export default authorSlice.reducer;
