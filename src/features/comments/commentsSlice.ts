/* eslint-disable no-param-reassign */
import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { Comment } from '../../types/Comment';

export interface CommentsState {
  value: Comment[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: CommentsState = {
  value: [],
  status: 'idle',
  error: null,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const response: Comment[] = await getPostComments(postId);

    return response;
  },
);

export const addNewComment = createAsyncThunk(
  'comments/addNewComment',
  async (data: Omit<Comment, 'id'>) => {
    const response = await createComment(data);

    return response;
  },
);

export const deleteCommentAsync = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    resetComments: (state) => {
      state.value = initialState.value;
      state.status = initialState.status;
      state.error = initialState.error;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'idle';

        state.value = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addNewComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNewComment.fulfilled, (state, action) => {
        state.status = 'idle';

        state.value.push(action.payload);
      })
      .addCase(addNewComment.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteCommentAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCommentAsync.fulfilled, (state, action) => {
        state.status = 'idle';

        const commentId = action.meta.arg;

        state.value = state.value.filter(comment => comment.id !== commentId);
      })
      .addCase(deleteCommentAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { resetComments } = commentsSlice.actions;
export const selectComments = (state: RootState) => state.comments.value;
export const selectCommentsStatus = (state: RootState) => state.comments.status;

export default commentsSlice.reducer;

export const getCommentsByPostId = (postId: number) => fetchComments(postId);
export const postComment = (data: Omit<Comment, 'id'>) => addNewComment(data);
export const deleteCommentByCommentId
  = (commentId: number) => deleteCommentAsync(commentId);
