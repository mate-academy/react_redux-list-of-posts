import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getPosts } from '../api/posts';

interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
  selectedPostId: number | null;
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
  selectedPostId: null,
};

// Fetch
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const posts = await getPosts();

  return posts;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetPosts: state => {
      state.items = []; // eslint-disable-line no-param-reassign
      state.loaded = false; // eslint-disable-line no-param-reassign
      state.hasError = false; // eslint-disable-line no-param-reassign
      state.selectedPostId = null; // eslint-disable-line no-param-reassign
    },
    selectPost: (state, action: PayloadAction<number | null>) => {
      state.selectedPostId = // eslint-disable-line no-param-reassign
        state.selectedPostId === action.payload ? null : action.payload;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.items.push(action.payload);
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      const index = state.items.findIndex(p => p.id === action.payload.id);

      if (index !== -1) {
        state.items[index] = action.payload; // eslint-disable-line no-param-reassign
      }
    },
    deletePost: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(p => p.id !== action.payload); // eslint-disable-line no-param-reassign
      if (state.selectedPostId === action.payload) {
        state.selectedPostId = null; // eslint-disable-line no-param-reassign
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loaded = false; // eslint-disable-line no-param-reassign
        state.hasError = false; // eslint-disable-line no-param-reassign
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.items = action.payload; // eslint-disable-line no-param-reassign
        state.loaded = true; // eslint-disable-line no-param-reassign
        state.hasError = false; // eslint-disable-line no-param-reassign
      })
      .addCase(fetchPosts.rejected, state => {
        state.loaded = true; // eslint-disable-line no-param-reassign
        state.hasError = true; // eslint-disable-line no-param-reassign
      });
  },
});

export const { resetPosts, selectPost, addPost, updatePost, deletePost } =
  postsSlice.actions;
export default postsSlice.reducer;
