import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { RootState } from '../../app/store';
import { getUserPosts } from '../../api/posts';

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPostsStatus = (state: RootState) => state.posts.status;

export interface PostsState {
  posts: Post[];
  status: 'loaded' | 'hasError' | 'items';
}

export const initialState: PostsState = {
  posts: [],
  status: 'items',
};

export const fetchPostsByUserId = createAsyncThunk(
  'posts/fetchPostsByUserId',
  async (userId: number) => {
    const response = await getUserPosts(userId);

    return response;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      return {
        ...state,
        posts: action.payload,
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPostsByUserId.pending, state => {
        return {
          ...state,
          status: 'items',
        };
      })
      .addCase(
        fetchPostsByUserId.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          return {
            ...state,
            status: 'loaded',
            posts: action.payload,
          };
        },
      )
      .addCase(fetchPostsByUserId.rejected, state => {
        return {
          ...state,
          status: 'hasError',
        };
      });
  },
});

export const { setPosts } = postsSlice.actions;

export default postsSlice.reducer;
