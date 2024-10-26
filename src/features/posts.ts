import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export const fetchPosts = createAsyncThunk('posts/fetch', (userId: number) =>
  getUserPosts(userId),
);

type PostsState = {
  items: Post[];
  selectedPost: Post | null;
  loaded: boolean;
  hasError: string;
};

const initialState: PostsState = {
  items: [],
  selectedPost: null,
  loaded: false,
  hasError: '',
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post | null>) => {
      return {
        ...state,
        selectedPost: action.payload,
      };
    },

    clearPosts: state => {
      return {
        ...state,
        items: [],
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      return {
        ...state,
        loaded: true,
      };
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      return {
        ...state,
        loaded: false,
        items: action.payload,
      };
    });

    builder.addCase(fetchPosts.rejected, state => {
      return {
        ...state,
        loaded: false,
        hasError: 'Something went wrong',
      };
    });
  },
});

export default postsSlice.reducer;
export const { setPost, clearPosts } = postsSlice.actions;
