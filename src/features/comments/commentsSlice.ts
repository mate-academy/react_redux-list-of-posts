/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import * as CommentsAPI from '../../api/comments';
import { Comment, CommentData } from '../../types/Comment';

export interface CommentsState {
  comments: Comment[];
  status: 'idle' | 'loading' | 'failed';
  hasError: boolean;
  loaded: boolean;
}

const initialState: CommentsState = {
  comments: [],
  status: 'idle',
  hasError: false,
  loaded: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const postComments = await CommentsAPI.getPostComments(postId);

    return postComments;
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (commentData: CommentData) => {
    const newComment = await CommentsAPI.createComment({ ...commentData });

    return newComment;
  },
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    const newComment = await CommentsAPI.deleteComment(commentId);

    return newComment;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setCommets: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    clear: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'idle';
        state.comments = action.payload;
        state.loaded = true;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.status = 'failed';
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(addComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.status = 'idle';
        state.comments.push(action.payload);
      })
      .addCase(addComment.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteComment.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(deleteComment.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectCommentsState = (state: RootState) => state.comments;
export const { setCommets, clear } = commentsSlice.actions;
export default commentsSlice.reducer;
