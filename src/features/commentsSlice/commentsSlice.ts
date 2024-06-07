import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

export interface CommetsState {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommetsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    const response = await getPostComments(postId);

    return response;
  },
);
export const createCommentWithApi = createAsyncThunk(
  '/comments/create',
  async (data: CommentData) => {
    const response = await createComment(data);

    return response;
  },
);

export const deleteCommentWithApi = createAsyncThunk(
  '/comments/delete',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loaded = true;
      })
      .addCase(fetchComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(createCommentWithApi.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(deleteCommentWithApi.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          comment => comment.id !== action.payload,
        );
      });
  },
});

export default commentsSlice.reducer;
