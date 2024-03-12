import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';
/* eslint-disable no-param-reassign */

export const init = createAsyncThunk('author/fetchPost', (userId: number) => {
  return getUserPosts(userId);
});

type AuthorState = {
  user: User | null;
  loading: boolean;
  error: boolean;
  posts: Post[];
  post: Post | null;
};

const initialState: AuthorState = {
  user: null,
  loading: false,
  error: false,
  posts: [],
  post: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    clear: state => {
      state.posts = [];
    },
    setPost: (state, action: PayloadAction<Post | null>) => {
      state.post = action.payload;
    },
    clearPost: state => {
      state.post = null;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(init.pending, state => {
        state.loading = true;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(init.rejected, state => {
        state.loading = false;
        state.error = true;
      });
  },
});
export const { setAuthor, clear, setPost, clearPost } = authorSlice.actions;
export default authorSlice.reducer;
