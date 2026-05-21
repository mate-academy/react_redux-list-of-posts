import { Post } from '../../types/Post';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPosts, getUserPosts } from '../../api/posts';

type PostState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const posts = await getPosts();

  return posts as Post[];
});

export const fetchPostsByUser = createAsyncThunk(
  'posts/fetchPostsByUser',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts as Post[];
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      // eslint-disable-next-line no-param-reassign
      state.items = [];
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
      // eslint-disable-next-line no-param-reassign
      state.hasError = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
      // eslint-disable-next-line no-param-reassign
      state.hasError = false;
    });
    builder.addCase(
      fetchPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        // eslint-disable-next-line no-param-reassign
        state.items = action.payload;
        // eslint-disable-next-line no-param-reassign
        state.loaded = false;
        // eslint-disable-next-line no-param-reassign
        state.hasError = false;
      },
    );
    builder.addCase(fetchPosts.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
      // eslint-disable-next-line no-param-reassign
      state.hasError = true;
    });
    builder.addCase(fetchPostsByUser.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
      // eslint-disable-next-line no-param-reassign
      state.hasError = false;
    });
    builder.addCase(
      fetchPostsByUser.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        // eslint-disable-next-line no-param-reassign
        state.items = action.payload;
        // eslint-disable-next-line no-param-reassign
        state.loaded = false;
        // eslint-disable-next-line no-param-reassign
        state.hasError = false;
      },
    );
    builder.addCase(fetchPostsByUser.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
      // eslint-disable-next-line no-param-reassign
      state.hasError = true;
    });
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
