import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; // PayloadAction
import { deleteComments, fetchComments, postComments } from './commentAPI';
import { Comment } from '../../types/Comment';

export interface CommentsState {
  allComments: Comment[] | null;
  allCommentsStatus: 'idle' | 'loading' | 'failed';
  newCommentStatus: 'idle' | 'loading' | 'failed';
}

const initialState: CommentsState = {
  allComments: null,
  allCommentsStatus: 'idle',
  newCommentStatus: 'idle',
};

export const createCommentAsync = createAsyncThunk(
  'comments/postComment',
  async (data: Comment) => {
    const newComment = await postComments(data);

    return newComment;
  },
);

export const deleteCommentAsync = createAsyncThunk(
  'comments/deleteComment',
  async (commentID: number) => {
    await deleteComments(commentID);

    return commentID;
  },
);

export const getCommentsAsync = createAsyncThunk(
  'comments/fetchComments',
  async (postID: number) => {
    const comments = await fetchComments(postID);

    return comments;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    delCommentFromState: (state, action) => {
      if (state.allComments && state.allComments.length) {
        // eslint-disable-next-line no-param-reassign
        state.allComments = state.allComments.filter(
          comment => comment.id !== action.payload,
        );
      } else {
        // eslint-disable-next-line no-param-reassign
        state.allComments = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsAsync.pending, (state) => {
        // eslint-disable-next-line no-param-reassign
        state.allCommentsStatus = 'loading';
      })
      .addCase(getCommentsAsync.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.allCommentsStatus = 'idle';
        // eslint-disable-next-line no-param-reassign
        state.allComments = action.payload;
      })
      .addCase(getCommentsAsync.rejected, (state) => {
        // eslint-disable-next-line no-param-reassign
        state.allCommentsStatus = 'failed';
      })
      .addCase(createCommentAsync.pending, (state) => {
        // eslint-disable-next-line no-param-reassign
        state.newCommentStatus = 'loading';
      })
      .addCase(createCommentAsync.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.newCommentStatus = 'idle';
        state.allComments?.push(action.payload);
      })
      .addCase(createCommentAsync.rejected, (state) => {
        // eslint-disable-next-line no-param-reassign
        state.newCommentStatus = 'failed';
      })
      .addCase(deleteCommentAsync.fulfilled, (state, action) => {
        if (state.allComments && state.allComments.length) {
          // eslint-disable-next-line no-param-reassign
          state.allComments = state.allComments.filter(
            comment => comment.id !== action.payload,
          );
        } else {
          // eslint-disable-next-line no-param-reassign
          state.allComments = null;
        }
      });
  },
});

export const { delCommentFromState } = commentsSlice.actions;
export default commentsSlice.reducer;
