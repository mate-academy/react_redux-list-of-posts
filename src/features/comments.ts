/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type State = {
  comments: Comment[],
  loaded: boolean,
  hasError: boolean,
  visible: boolean,
  submitting: boolean,
};

const initialState: State = {
  comments: [],
  loaded: false,
  hasError: false,
  visible: false,
  submitting: false,
};

export const initComments = createAsyncThunk('comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  });

export const addComment = createAsyncThunk('createComment/post',
  (data: Omit<Comment, 'id'>) => {
    const newComment = createComment(data);

    return newComment;
  });

export const removeComment = createAsyncThunk('removeComment/delete',
  (commentId: number) => {
    deleteComment(commentId);

    return commentId;
  });

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setVisible: (state, actions: PayloadAction<boolean>) => {
      state.visible = actions.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(initComments.pending, (state) => {
      state.loaded = false;

      return state;
    });

    builder.addCase(initComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.comments = action.payload;
        state.loaded = true;

        return state;
      });

    builder.addCase(initComments.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;

      return state;
    });

    builder.addCase(addComment.pending, (state) => {
      state.submitting = true;

      return state;
    });

    builder.addCase(addComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.submitting = false;
        state.comments = [
          ...state.comments,
          action.payload,
        ];

        return state;
      });

    builder.addCase(addComment.rejected, (state) => {
      state.hasError = true;
      state.submitting = false;

      return state;
    });

    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.comments = state.comments.filter((comment) => (
        comment.id !== action.payload
      ));

      return state;
    });
  },
});

export default commentsSlice.reducer;
export const { setVisible } = commentsSlice.actions;
