import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

export interface CommentsState {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const loadComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const createComments = createAsyncThunk(
  'comments/add',
  async ({
    postId,
    commentData,
  }: {
    postId: number;
    commentData: CommentData;
  }) => {
    return createComment({ ...commentData, postId });
  },
);

export const deleteComments = createAsyncThunk(
  'comment/delete',
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
    builder.addCase(loadComments.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(
      loadComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.comments = action.payload;
        state.hasError = false;
        state.loaded = true;
      },
    );
    builder.addCase(loadComments.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });

    builder.addCase(
      createComments.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.comments.push(action.payload);
      },
    );
    builder.addCase(createComments.rejected, state => {
      state.hasError = true;
    });

    builder.addCase(
      deleteComments.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.comments = state.comments.filter(
          comment => comment.id !== action.payload,
        );
      },
    );
  },
});

export default commentsSlice.reducer;
