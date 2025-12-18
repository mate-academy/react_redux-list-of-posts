import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';
import { User } from '../../types/User';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

export interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
  author: User | null;
  selectedPost: Post | null;
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
  author: null,
  selectedPost: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      // eslint-disable-next-line no-param-reassign
      state.author = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.items = [];
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
      // eslint-disable-next-line no-param-reassign
      state.hasError = false;
      // eslint-disable-next-line no-param-reassign
      state.selectedPost = null;
    },
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      // eslint-disable-next-line no-param-reassign
      state.selectedPost = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        // eslint-disable-next-line no-param-reassign
        state.loaded = false;
        // eslint-disable-next-line no-param-reassign
        state.hasError = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        // eslint-disable-next-line no-param-reassign
        state.items = action.payload;
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
      })
      .addCase(fetchPosts.rejected, state => {
        // eslint-disable-next-line no-param-reassign
        state.hasError = true;
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
      });
  },
});

export const { setAuthor, setSelectedPost } = postsSlice.actions;

export default postsSlice.reducer;
