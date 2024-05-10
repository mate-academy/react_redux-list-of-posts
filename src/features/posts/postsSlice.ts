import { getUserPosts } from '../../api/posts';
import { Post } from './../../types/Post';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UsersState {
  posts: Post[];
  hasError: boolean;
  loader: boolean;
  selectedPost: Post | null;
}

const initialState: UsersState = {
  posts: [],
  hasError: false,
  loader: false,
  selectedPost: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.posts = action.payload;
    },
    setPost: (state, action: PayloadAction<Post>) => {
      // eslint-disable-next-line no-param-reassign
      state.selectedPost = action.payload;
    },
    deletePost: state => {
      // eslint-disable-next-line no-param-reassign
      state.selectedPost = null;
    },
  },
  extraReducers: builder => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    builder.addCase(init.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.loader = false;
    });

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    builder.addCase(init.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.posts = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.loader = true;
    });

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    builder.addCase(init.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.loader = true;
      // eslint-disable-next-line no-param-reassign
      state.hasError = true;
    });
  },
});

export default postsSlice.reducer;
export const { set, setPost, deletePost } = postsSlice.actions;

export const init = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});
