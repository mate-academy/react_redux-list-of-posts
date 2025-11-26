import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getPosts, getUserPosts } from '../../api/posts';
import { RootState } from '../../app/store';

export interface PostsState {
  posts: Post[];
  selectedPost: Post | null;
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  loading: true,
  error: null,
};

export const fetchUserPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await getPosts();

  return response;
});

export const fetchPosts = createAsyncThunk(
  'userPosts/fetchUserPosts',
  async (userId: number) => {
    const response = await getUserPosts(userId);

    return response;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost(state, action: PayloadAction<Post | null>) {
      state.selectedPost = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loading = true;
        state.error = null;
        state.posts = [];
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, state => {
        state.loading = false;
        state.error = 'Posts can not be found';
      })

      .addCase(fetchUserPosts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPost = action.payload[0] || null;
      })
      .addCase(fetchUserPosts.rejected, state => {
        state.loading = false;
        state.error = 'A post can not be found';
      });
  },
});

export const selectPostsList = (state: RootState) => state.posts.posts;
export const selectPostsLoading = (state: RootState) => state.posts.loading;
export const selectPostsError = (state: RootState) => state.posts.error;
export const selectSelectedPosts = (state: RootState) =>
  state.posts.selectedPost;

export const { setSelectedPost } = postsSlice.actions;

export default postsSlice.reducer;
