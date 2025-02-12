import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type UserPostsState = {
  posts: Post[];
  loading: boolean;
  error: string;
  selectedPost: Post | null;
};

const initialState: UserPostsState = {
  posts: [],
  loading: false,
  error: '',
  selectedPost: null,
};

export const init = createAsyncThunk(
  'posts/fetchUserPosts',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

export const userPostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    /* eslint-disable no-param-reassign */
    selectPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loading = true;
    });
    builder.addCase(init.fulfilled, (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
      state.loading = false;
    });
    builder.addCase(init.rejected, state => {
      state.loading = false;
      state.error = 'Error loading posts';
    });
    /* eslint-enable no-param-reassign */
  },
});

export default userPostsSlice.reducer;
export const { selectPost } = userPostsSlice.actions;
