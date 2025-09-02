/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';
import { RootState } from '../../app/store';
type PostsState = {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const postsFetch = createAsyncThunk<Post[], void, { state: RootState }>(
  'posts/fetch',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const author = state.author.value;

    if (!author) {
      return [];
    }

    const posts = await getUserPosts(author.id);

    return posts;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(postsFetch.pending, state => {
      state.loaded = true;
      state.hasError = false;
    });
    builder.addCase(
      postsFetch.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.posts = action.payload;
        state.loaded = false;
        state.hasError = false;
      },
    );
    builder.addCase(postsFetch.rejected, state => {
      state.loaded = false;
      state.hasError = true;
    });
  },
});

export default postsSlice.reducer;
