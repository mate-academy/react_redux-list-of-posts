import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type PostState = {
  posts: Post[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: PostState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk('load/posts', getUserPosts);

const postSlice = createSlice({
  name: 'posts',
  initialState: initialState as PostState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(init.fulfilled, (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
      state.loaded = true;
    });

    builder.addCase(init.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export const { setPosts } = postSlice.actions;
export default postSlice.reducer;
