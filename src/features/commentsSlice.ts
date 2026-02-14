/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, getPostComments, deleteComment } from '../api/comments';

type CommentState = {
  commentList: Comment[];
  isCommLoading: boolean;
  hasCommError: boolean;
};

const initialState: CommentState = {
  commentList: [],
  isCommLoading: false,
  hasCommError: false,
};

export const initComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'comments/add',
  (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

export const removeComment = createAsyncThunk(
  'comments/delete',
  (commentId: number) => {
    return deleteComment(commentId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.commentList = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(initComments.pending, state => {
      state.isCommLoading = true;
    });
    builder.addCase(initComments.fulfilled, (state, action) => {
      state.commentList = action.payload;
      state.isCommLoading = false;
      state.hasCommError = false;
    });
    builder.addCase(initComments.rejected, state => {
      state.hasCommError = true;
      state.isCommLoading = false;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.commentList.push(action.payload);
      state.hasCommError = false;
    });
    builder.addCase(addComment.rejected, state => {
      state.hasCommError = true;
    });
    builder.addCase(removeComment.rejected, state => {
      state.hasCommError = true;
    });
    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.hasCommError = false;
      state.commentList = state.commentList.filter(
        c => c.id !== action.payload,
      );
    });
  },
});

export const { setComments } = commentsSlice.actions;
export default commentsSlice.reducer;
