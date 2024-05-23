/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';

export interface PostsState {
  commentsList: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  commentsList: [],
  loaded: true,
  hasError: false,
};

export const fetchPostComments = async (postId: number) => {
  const posts = await getPostComments(postId);

  return posts;
};

export const getPostCommentsAsync = createAsyncThunk(
  'comments/fetchPostComments',
  async (postId: number) => {
    const value = await fetchPostComments(postId);

    return value;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setCommentsList: (state, action: PayloadAction<Comment[]>) => {
      state.commentsList = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getPostCommentsAsync.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(getPostCommentsAsync.fulfilled, (state, action) => {
        state.loaded = true;
        state.commentsList = action.payload;
      })
      .addCase(getPostCommentsAsync.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const { setCommentsList, setError } = commentsSlice.actions;

export default commentsSlice.reducer;
