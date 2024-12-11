import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';
import { RootState } from '../../app/store';

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

export const loadUserPostsAsync = createAsyncThunk(
  'posts/loadPostAsync',
  (userId: number) => {
    return getUserPosts(userId);
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setLoaded: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loaded: action.payload,
      };
    },
    setError: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        hasError: action.payload,
      };
    },

    clearPosts: () => {
      return {
        items: [],
        loaded: true,
        hasError: false,
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(
        loadUserPostsAsync.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          return {
            ...state,
            items: action.payload,
          };
        },
      )
      .addCase(loadUserPostsAsync.pending, state => {
        return {
          ...state,
          loaded: false,
          hasError: false,
        };
      })
      .addCase(loadUserPostsAsync.rejected, state => {
        return {
          ...state,
          loaded: true,
          hasError: true,
        };
      });
  },
});

export const selectPosts = (state: RootState) => state.posts.items;
export const selectLoaded = (state: RootState) => state.posts.loaded;
export const selectHasError = (state: RootState) => state.posts.hasError;

export const { setLoaded, clearPosts, setError } = postsSlice.actions;
export default postsSlice.reducer;
