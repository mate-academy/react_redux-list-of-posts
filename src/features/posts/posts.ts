import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type InitialState = {
  loaded: boolean;
  hasError: boolean;
  posts: Post[];
  selectedPost: Post | null;
};

const initialState: InitialState = {
  loaded: false,
  hasError: false,
  posts: [],
  selectedPost: null,
};

export const init = createAsyncThunk(
  'posts/fetch',
  (userId: number | object) => {
    if (typeof userId === 'number') {
      return getUserPosts(userId);
    } else {
      return [];
    }
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, action) => {
      return { ...state, selectedPost: action.payload };
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      return { ...state, loaded: false };
    });

    builder.addCase(init.fulfilled, (state, action) => {
      return { ...state, posts: action.payload, loaded: true };
    });

    builder.addCase(init.rejected, state => {
      return { ...state, hasError: true, loaded: true };
    });
  },
});

export default postsSlice.reducer;
export const { setSelectedPost } = postsSlice.actions;
