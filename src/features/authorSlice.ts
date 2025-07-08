/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { User } from '../types/User';
import { fetchPosts } from './postsSlice';
import { setSelectedPost } from './selectedPostSlice';

export const setSelectedAuthor = createAsyncThunk(
  'author/setSelectedAuthor',
  async (user: User | null, { dispatch }) => {
    if (user) {
      dispatch(fetchPosts(user.id));
      dispatch(setSelectedPost(null));
    }

    return user;
  },
);

const initialState = {
  selectedAuthor: null as User | null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      setSelectedAuthor.fulfilled,
      (state, action: PayloadAction<User | null>) => {
        state.selectedAuthor = action.payload;
      },
    );
  },
});

export const selectAuthor = (state: RootState) => state.author.selectedAuthor;

export default authorSlice.reducer;
