/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createComment, getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';

export interface CommentsState {
  comments: Comment[];
  status: 'loaded' | 'hasError' | 'items';
}

const initialState: CommentsState = {
  comments: [],
  status: 'loaded',
};

export const commentssAsync = createAsyncThunk(
  'comments/commentsAsync',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const createCommentAsync = createAsyncThunk(
  'createComment/createCommenttAsync',
  async (data: Omit<Comment, 'id'>) => {
    const comment = await createComment(data);

    return comment;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deleteComment: (state, action: PayloadAction<number>) => {
      state.comments = state
        .comments.filter(comment => comment.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(commentssAsync.pending, (state) => {
        state.comments = [];
        state.status = 'loaded';
      })
      .addCase(
        commentssAsync.fulfilled,
        (state: CommentsState, action: PayloadAction<Comment[]>) => {
          state.comments = action.payload;
          state.status = 'items';
        },
      )
      .addCase(commentssAsync.rejected, (state) => {
        state.comments = [];
        state.status = 'hasError';
      })
      .addCase(
        createCommentAsync.fulfilled,
        (state: CommentsState, action: PayloadAction<Comment>) => {
          state.comments = [...state.comments, action.payload];
          state.status = 'items';
        },
      )
      .addCase(createCommentAsync.rejected, (state) => {
        state.status = 'hasError';
      });
  },
});

export const { deleteComment } = commentsSlice.actions;

export default commentsSlice.reducer;
