import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import * as commentsApi from '../../api/comments';

type InitialState = {
  comments: Comment[],
  loading: boolean,
  error: boolean,
};

const initialState: InitialState = {
  comments: [],
  loading: false,
  error: false,
};

export const initComments = createAsyncThunk(
  'comments/fetch',
  (idPost: number) => commentsApi.getPostComments(idPost),
);

export const addCommentToState = createAsyncThunk(
  'comments/post',
  (newComment: Pick<Comment, 'name' | 'email' | 'body' | 'postId'>) => {
    return commentsApi.createComment(newComment);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deleteComments: (state, action: PayloadAction<number>) => {
      commentsApi.deleteComment(action.payload);

      return {
        ...state,
        comments: state.comments.filter(({ id }) => id !== action.payload),
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      initComments.pending,
      (state) => ({
        ...state, loading: true, error: false,
      }),
    );
    builder.addCase(
      initComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => ({
        ...state,
        loading: false,
        comments: action.payload,
      }),
    );
    builder.addCase(
      initComments.rejected,
      (state) => ({
        ...state, loading: false, error: true,
      }),
    );
    builder.addCase(
      addCommentToState.pending,
      (state) => ({
        ...state, error: false,
      }),
    );
    builder.addCase(
      addCommentToState.fulfilled,
      (state, action: PayloadAction<Comment>) => ({
        ...state,
        comments: [...state.comments, action.payload],
      }),
    );
    builder.addCase(
      addCommentToState.rejected,
      (state) => ({
        ...state, error: true,
      }),
    );
  },
});

export const commentsReduser = commentsSlice.reducer;
export const commentsActions = commentsSlice.actions;
