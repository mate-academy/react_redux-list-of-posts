import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

export interface CommentsState {
  comments: Comment[];
  isCommetsLoading: boolean;
  errorMessageOnCommentsLoading: string;
  isSubmiting: boolean;
}

const initialState: CommentsState = {
  comments: [],
  isCommetsLoading: false,
  errorMessageOnCommentsLoading: '',
  isSubmiting: false,
};

export const loadPostComments = createAsyncThunk(
  'comments/loadComments',
  (postId: number) => getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'comments/createComment',
  (data: Omit<Comment, 'id'>) => createComment(data),
);

export const removeComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadPostComments.pending, state => {
        /* eslint-disable no-param-reassign */
        state.isCommetsLoading = true;
      })
      .addCase(
        loadPostComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          /* eslint-disable no-param-reassign */
          state.comments = action.payload;
          state.isCommetsLoading = false;
        },
      )
      .addCase(loadPostComments.rejected, state => {
        /* eslint-disable no-param-reassign */
        state.errorMessageOnCommentsLoading = 'an error on comments loading';
        state.isCommetsLoading = false;
      });

    builder
      .addCase(addComment.pending, state => {
        // eslint-disable-next-line no-param-reassign
        state.isSubmiting = true;
      })
      .addCase(
        addComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          /* eslint-disable no-param-reassign */
          state.isSubmiting = false;
          state.comments = [...state.comments, action.payload];
        },
      )
      .addCase(addComment.rejected, state => {
        /* eslint-disable no-param-reassign */
        state.errorMessageOnCommentsLoading = 'an error on a comment creating';
        state.isSubmiting = false;
      });

    builder
      .addCase(removeComment.pending, (state, { meta: { arg: commentId } }) => {
        /* eslint-disable no-param-reassign */
        state.comments = state.comments.filter(
          comment => comment.id !== commentId,
        );
        state.isCommetsLoading = false;
      })
      .addCase(removeComment.fulfilled, state => {
        /* eslint-disable no-param-reassign */
        state.isCommetsLoading = false;
      })
      .addCase(removeComment.rejected, state => {
        /* eslint-disable no-param-reassign */
        state.errorMessageOnCommentsLoading = 'an error on a comment deleting';
        state.isCommetsLoading = false;
      });
  },
});
