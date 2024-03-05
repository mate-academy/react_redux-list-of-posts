import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostState {
  posts: Post[];
  isLoader: boolean;
  isError: boolean;
  selectedPost: Post | null;
}
const initialState: PostState = {
  posts: [],
  isLoader: false,
  isError: false,
  selectedPost: null,
};

export const fetchPost = createAsyncThunk('posts/fetch', (id: number) => {
  return getUserPosts(id);
});

export const postState = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    selectedPosts: (state, action: PayloadAction<Post | null>) => {
      return {
        ...state,
        selectedPost: action.payload,
      };
    },

    clearPosts: state => {
      return {
        ...state,
        posts: [],
      };
    },
  },

  extraReducers: builder => {
    builder.addCase(fetchPost.pending, state => {
      return {
        ...state,
        isLoader: true,
        isError: false,
      };
    });

    builder.addCase(fetchPost.fulfilled, (state, action) => {
      return {
        ...state,
        posts: action.payload,
        isLoader: false,
      };
    });

    builder.addCase(fetchPost.rejected, state => {
      return {
        ...state,
        isLoader: false,
        isError: true,
      };
    });
  },
});

export default postState.reducer;
export const { selectedPosts, clearPosts } = postState.actions;
