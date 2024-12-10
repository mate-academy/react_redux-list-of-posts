import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface PostState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostState = {
  items: [],
  loaded: true,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },

    clearPosts: state => {
      state.items = [];
      state.loaded = true;
      state.hasError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(
        loadUserPostAsync.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.items = action.payload;
        },
      )
      .addCase(loadUserPostAsync.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(loadUserPostAsync.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const loadUserPostAsync = createAsyncThunk(
  'posts/loadPostAsync',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

export const { setLoaded, clearPosts, setError } = postsSlice.actions;
export default postsSlice.reducer;
