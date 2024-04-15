import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export type UserPost = {
  posts: Post[];
  selectedPost: Post | null;
  loading: boolean;
  error: string;
};

const initialState: UserPost = {
  posts: [],
  selectedPost: null,
  loading: false,
  error: '',
};

export const posts = createAsyncThunk(`/posts`, (userSelect: number) => {
  return getUserPosts(userSelect);
});

export const PostsContext = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      const currentState = state;

      currentState.posts = action.payload;
    },
    setSelectedPost(state, action: PayloadAction<Post>) {
      const currentState = state;

      currentState.selectedPost = action.payload;
    },
    setClearSelected(state) {
      const currentState = state;

      currentState.selectedPost = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(posts.pending, state => {
      const currentState = state;

      currentState.loading = true;
    });
    builder.addCase(posts.fulfilled, (state, action) => {
      const currentState = state;

      currentState.posts = action.payload;
      currentState.loading = false;
    });
    builder.addCase(posts.rejected, state => {
      const currentState = state;

      currentState.loading = false;
      currentState.error = 'Error';
    });
  },
});

// eslint-disable-next-line
export const { setPosts, setSelectedPost, setClearSelected } = PostsContext.actions;
export default PostsContext.reducer;
