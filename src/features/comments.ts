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
        return { ...state, isCommetsLoading: true };
      })
      .addCase(
        loadPostComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          return {
            ...state,
            comments: action.payload,
            isCommetsLoading: false,
          };
        },
      )
      .addCase(loadPostComments.rejected, state => {
        return {
          ...state,
          errorMessageOnCommentsLoading: 'an error on comments loading',
          isCommetsLoading: false,
        };
      });

    builder
      .addCase(addComment.pending, state => {
        return {
          ...state,
          isSubmiting: true,
        };
      })
      .addCase(
        addComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          return {
            ...state,
            isSubmiting: false,
            comments: [...state.comments, action.payload],
          };
        },
      )
      .addCase(addComment.rejected, state => {
        return {
          ...state,
          errorMessageOnCommentsLoading: 'an error on a comment creating',
          isSubmiting: false,
        };
      });

    builder
      .addCase(removeComment.pending, state => {
        return { ...state, isCommetsLoading: true };
      })
      .addCase(
        removeComment.fulfilled,
        (state, { payload }: PayloadAction<number>) => {
          const newComments = state.comments.filter(({ id }) => id !== payload);

          return {
            ...state,
            isCommetsLoading: false,
            comments: newComments,
          };
        },
      )
      .addCase(removeComment.rejected, state => {
        return {
          ...state,
          errorMessageOnCommentsLoading: 'an error on a comment deleting',
          isCommetsLoading: false,
        };
      });
  },
});
