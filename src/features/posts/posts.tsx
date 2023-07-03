import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type Posts = {
  items: Post[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: Posts = {
  items: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk(
  'posts/fetch',
  (userId: number) => getUserPosts(userId),
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      return { ...state, loaded: false };
    });

    builder.addCase(init.fulfilled, (state, action: PayloadAction<Post[]>) => {
      return { ...state, items: action.payload, loaded: true };
    });

    builder.addCase(init.rejected, (state) => {
      return { ...state, hasError: true };
    });
  },
});

export default postsSlice.reducer;
