import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

type Props = {
  items: Post[],
  hasError: boolean,
  loaded: boolean,
};

const initialState: Props = {
  items: [],
  hasError: false,
  loaded: false,
};

export const loadApiPosts = createAsyncThunk('posts/load', getUserPosts);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadApiPosts.pending, (state) => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
    });

    builder.addCase(loadApiPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        // eslint-disable-next-line no-param-reassign
        state.items = action.payload;
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
      });

    builder.addCase(loadApiPosts.rejected, (state) => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
      // eslint-disable-next-line no-param-reassign
      state.hasError = true;
    });
  },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
