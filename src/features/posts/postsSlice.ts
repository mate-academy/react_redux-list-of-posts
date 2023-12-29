import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPostsThunk } from '../../thunks/PostsThunks';

export interface PostsState {
  posts: Post[];
  loading: boolean,
  error: boolean,
  post: Post | null,
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: false,
  post: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post | null>) => {
      return {
        ...state,
        post: action.payload,
      };
    },
    removePost: (state) => {
      return {
        ...state,
        post: null,
      };
    },
    removePosts: (state) => {
      return {
        ...state,
        posts: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserPostsThunk.pending, (state) => {
      return {
        ...state,
        loading: false,
      };
    });

    builder.addCase(getUserPostsThunk.fulfilled, (state, action) => {
      return {
        ...state,
        loading: true,
        posts: action.payload,
      };
    });

    builder.addCase(getUserPostsThunk.rejected, (state) => {
      return {
        ...state,
        loading: true,
        error: true,
      };
    });
  },
});

export default postsSlice.reducer;
export const { actions } = postsSlice;
