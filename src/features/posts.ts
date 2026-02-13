import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPosts, getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  items: [] as Post[],
  loaded: false,
  hasError: false,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const posts = await getPosts();

  return posts;
});

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchuserPosts',
  async (userid: number) => {
    const userPosts = await getUserPosts(userid);

    return userPosts;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      return {
        ...state,
        loaded: false,
        hasError: false,
      };
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      return {
        ...state,
        items: action.payload,
        loaded: true,
      };
    });
    builder.addCase(fetchPosts.rejected, state => {
      return {
        ...state,
        hasError: true,
        loaded: false,
      };
    });
    builder.addCase(fetchUserPosts.pending, state => {
      return {
        ...state,
        loaded: false,
        hasError: false,
      };
    });
    builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
      return {
        ...state,
        items: action.payload,
        loaded: true,
      };
    });
    builder.addCase(fetchUserPosts.rejected, state => {
      return {
        ...state,
        hasError: true,
        loaded: false,
      };
    });
  },
});

export const postsReducer = postsSlice.reducer;
export type { PostsState };
