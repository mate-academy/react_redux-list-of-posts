import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async (userId: number) => {
    const response = await getUserPosts(userId);

    return response;
  },
);

interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      return {
        ...state,
        items: [],
        loaded: false,
        hasError: false,
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserPosts.pending, state => {
        return {
          ...state,
          loaded: false,
          hasError: false,
        };
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        return {
          ...state,
          items: action.payload,
          loaded: true,
        };
      })
      .addCase(fetchUserPosts.rejected, state => {
        return {
          ...state,
          loaded: true,
          hasError: true,
        };
      });
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
