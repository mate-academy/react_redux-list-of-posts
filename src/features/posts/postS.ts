import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

type PostsState = {
  posts: Post[];
  posT: Post | null,
  loading: boolean,
  error: string,
};

const initialState: PostsState = {
  posts: [],
  posT: null,
  loading: false,
  error: '',
};

export const initPosts = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    selectPost: (state, action: PayloadAction<Post | null>) => {
      return {
        ...state,
        posT: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initPosts.pending, (state) => {
      return {
        ...state,
        error: '',
        loading: true,
      };
    });

    builder.addCase(initPosts.fulfilled, (state, action) => {
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    });

    builder.addCase(initPosts.rejected, (state) => {
      return {
        ...state,
        loading: false,
        error: 'Something went wrong!',
      };
    });
  },
});

export default postsSlice.reducer;

export const { selectPost } = postsSlice.actions;
