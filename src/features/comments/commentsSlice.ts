/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../../types/Comment';
import { createComment, deleteComment, getPostComments } from './commentsAPI';

type CommentsState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk('comments/fetchComments', (id: number) =>
  getPostComments(id),
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComment: (state, action: PayloadAction<Comment>) => {
      state.comments = [...state.comments, action.payload];
    },

    clearComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },

    handleLoadedState: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },

    handleErrorState: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(init.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loaded = true;
      })
      .addCase(init.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export default commentsSlice.reducer;
export const { setComment, clearComment, handleLoadedState, handleErrorState } =
  commentsSlice.actions;

export const addComment = createAsyncThunk(
  'comments/postComment',
  async ({ name, email, body, postId }: CommentData, { dispatch }) => {
    try {
      const newComment = await createComment({
        name,
        email,
        body,
        postId,
      });

      dispatch(setComment(newComment));
    } catch {
      dispatch(handleErrorState(true));
    }
  },
);

export const handleDeleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (value: number, { dispatch }) => {
    dispatch(clearComment(value));

    await deleteComment(value);
  },
);
