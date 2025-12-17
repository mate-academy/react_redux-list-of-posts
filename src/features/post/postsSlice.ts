/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts, getPosts } from '../../api/posts';
import { RootState } from '../../app/store';

export interface PostsState {
  value: Post[];
  status: 'idle' | 'loading' | 'failed';
  userPosts: Post[];
  userPostsStatus: 'idle' | 'loading' | 'failed';
  selectedPost: Post | null;
  selectedPostStatus: 'idle' | 'loading' | 'failed';
}

const initialState: PostsState = {
  value: [],
  status: 'idle',
  userPosts: [],
  userPostsStatus: 'idle',
  selectedPost: null,
  selectedPostStatus: 'idle',
};

export const fetchPosts = createAsyncThunk<Post[]>('posts/fetch', async () => {
  const value = await getPosts();

  return value;
});

export const fetchUserPosts = createAsyncThunk<Post[], number>(
  'posts/fetchUserPosts',
  async id => {
    const value = await getUserPosts(id);

    return value;
  },
);

export const selectPostById = (postId: number | null) => (state: RootState) => {
  return (
    state.posts.userPosts?.find(post => post.id === postId) ||
    state.posts.value.find(post => post.id === postId) ||
    null
  );
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.value = action.payload;
    },
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(fetchPosts.rejected, state => {
        state.status = 'failed';
      })
      .addCase(fetchUserPosts.pending, state => {
        state.userPostsStatus = 'loading';
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.userPostsStatus = 'idle';
        state.userPosts = action.payload;
      })
      .addCase(fetchUserPosts.rejected, state => {
        state.userPostsStatus = 'failed';
      });
  },
});

export default postsSlice.reducer;
export const { setPosts, setSelectedPost } = postsSlice.actions;
