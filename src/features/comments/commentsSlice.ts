import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

import { Comment } from '../../types/Comment';

interface CommentsState {
  comments: Comment[];
  isLoading: boolean;
  isError: boolean;
  isVisible: boolean;
  isSubmitting: boolean;
}

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  isError: false,
  isVisible: false,
  isSubmitting: false,
};

export const fetchComments = createAsyncThunk('comments/fetch', (id: number) =>
  getPostComments(id),
);

export const addComment = createAsyncThunk(
  'comments/add',
  (data: Omit<Comment, 'id'>) => createComment(data),
);

export const onDeleteComment = createAsyncThunk(
  'comment/delete',
  async (id: number) => {
    deleteComment(id);

    return id;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setIsVisible: (state, action: PayloadAction<boolean>) => {
      /*eslint no-param-reassign: "error"*/
      state.isVisible = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      state.isVisible = false;
      state.isError = false;
      state.isLoading = false;
    });

    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.isLoading = true;
    });

    builder.addCase(fetchComments.rejected, state => {
      state.isError = true;
      state.isLoading = true;
    });

    builder.addCase(addComment.pending, state => {
      state.isSubmitting = true;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.isSubmitting = false;
      state.comments.push(action.payload);
    });

    builder.addCase(addComment.rejected, state => {
      state.isError = true;
      state.isSubmitting = false;
    });

    builder.addCase(onDeleteComment.fulfilled, (state, action) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    });
  },
});

export const { setIsVisible: setVisible } = commentsSlice.actions;

export default commentsSlice.reducer;
