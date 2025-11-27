import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getPosts, getUserPosts } from '../../api/posts';
import { RootState } from '../../app/store';

export interface PostsState {
  items: Post[];
  selectedPost: Post | null;
  loaded: boolean;
  hasError: string | null;
}

const initialState: PostsState = {
  items: [],
  selectedPost: null,
  loaded: true,
  hasError: null,
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
        state.loaded = true;
        state.hasError = null;
        state.items = [];
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loaded = false;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, state => {
        state.loaded = false;
        state.hasError = 'Posts can not be found';
      })

      .addCase(fetchUserPosts.pending, state => {
        state.loaded = true;
        state.hasError = null;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.loaded = false;
        state.selectedPost = action.payload[0] || null;
      })
      .addCase(fetchUserPosts.rejected, state => {
        state.loaded = false;
        state.hasError = 'A post can not be found';
      });
  },
});

export const selectPostsList = (state: RootState) => state.posts.items;
export const selectPostsLoading = (state: RootState) => state.posts.loaded;
export const selectPostsError = (state: RootState) => state.posts.hasError;
export const selectSelectedPosts = (state: RootState) =>
  state.posts.selectedPost;

export const { setSelectedPost } = postsSlice.actions;

export default postsSlice.reducer;
