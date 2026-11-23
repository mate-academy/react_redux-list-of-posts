import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

export interface InitialState {
  comments: Comment[];
  commentsLoading: boolean;
  commentsError: boolean;

  submiting: boolean;
  submitError: boolean;
}

const initialState: InitialState = {
  comments: [],
  commentsLoading: false,
  commentsError: false,

  submiting: false,
  submitError: false,
};

export const commentsInit = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'addComments/fetchAddComments',
  async (comment: CommentData) => {
    return createComment(comment);
  },
);

export const removeComment = createAsyncThunk(
  'deleteComments/fetcDeleteComments',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comment',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(commentsInit.pending, state => ({
        ...state,
        commentsLoading: true,
      }))
      .addCase(commentsInit.fulfilled, (state, action) => ({
        ...state,
        commentsLoading: false,
        commentsError: false,
        comments: action.payload,
      }))
      .addCase(commentsInit.rejected, state => ({
        ...state,
        commentsLoading: false,
        commentsError: true,
      }))
      .addCase(addComment.pending, state => ({
        ...state,
        submiting: true,
        submitError: false,
      }))
      .addCase(addComment.fulfilled, (state, action) => ({
        ...state,
        submiting: false,
        submitError: false,
        comments: [...state.comments, action.payload],
      }))
      .addCase(addComment.rejected, state => ({
        ...state,
        submitError: true,
        submiting: false,
      }))
      .addCase(removeComment.fulfilled, (state, action) => ({
        ...state,
        comments: state.comments.filter(
          comment => comment.id !== action.payload,
        ),
      }));
  },
});

export const commentsActions = commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;
