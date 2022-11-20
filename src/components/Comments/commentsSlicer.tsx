/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { Comment } from '../../types/Comment';
import { client } from '../../utils/fetchClient';
import { Post } from '../../types/Post';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface CommentsState {
  comments: Comment[];
  loading: 'idle' | 'loading' | 'failed';
  error: string,
  selectedPost: Post | null,
}

const initialState: CommentsState = {
  comments: [],
  loading: 'idle',
  error: '',
  selectedPost: null,
};

export const fetchPostComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    return client.get<Comment[]>(`/comments?postId=${postId}`);
  },
);

export const commentsSlice = createSlice(
  {
    name: 'comments',
    initialState,
    reducers: {
      selectPost: (state, action) => {
        state.selectedPost = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchPostComments.pending, (state) => {
          state.loading = 'loading';
        })
        .addCase(fetchPostComments.fulfilled, (state, action) => {
          state.loading = 'idle';
          state.comments = action.payload;
        })
        .addCase(fetchPostComments.rejected, (state) => {
          state.loading = 'failed';
          state.error = 'Failed to fetch';
        });
    },
  },
);

export const { selectPost } = commentsSlice.actions;

export const selectComments = (state: RootState) => state.comments.comments;
export const getPost = (state: RootState) => state.comments.selectedPost;

export default commentsSlice.reducer;
