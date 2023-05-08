import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

type PostsState = {
  posts: Post[],
  loaded: boolean,
  hasError: boolean,
  selectedPost: Post | null,
};

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
  selectedPost: null,
};

export const fetchUserPosts = createAsyncThunk(
  'posts/fetch',
  (userId: number) => {
    return getUserPosts(userId);
  },
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      const currentState = state;

      currentState.selectedPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserPosts.pending, (state) => {
      const currentState = state;

      currentState.loaded = false;
    });

    builder.addCase(
      fetchUserPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        const currentState = state;

        currentState.posts = action.payload;
        currentState.loaded = true;
      },
    );

    builder.addCase(fetchUserPosts.rejected, (state) => {
      const currentState = state;

      currentState.loaded = true;
      currentState.hasError = true;
    });
  },
});

export const { setSelectedPost } = postSlice.actions;
export default postSlice.reducer;
