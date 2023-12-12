/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as commentsMethods from '../api/comments';
import { Comment } from '../types/Comment';

export const fetchComments = createAsyncThunk(
  'comments/fetch_comments', (id: number) => {
    return commentsMethods.getPostComments(id);
  },
);

export const fetchAddComment = createAsyncThunk(
  'comments/add_comments', (comment: Omit<Comment, 'id'>) => {
    return commentsMethods.createComment(comment);
  },
);

export const fetchRemoveComment = createAsyncThunk(
  'comments/delete_comments', (commentId: number) => {
    return commentsMethods.deleteComment(commentId);
  },
);

type State = {
  comments: Comment[],
  error: string | null,
  loading: boolean,
  comment: Comment | null,
};

const initialState: State = {
  comments: [],
  error: null,
  loading: false,
  comment: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },

    setComment: (state, action: PayloadAction<Comment>) => {
      state.comment = action.payload;
    },

    removeComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = true;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.loading = true;
        state.error = 'Error';
      });

    builder
      .addCase(fetchAddComment.pending, (state) => {
        state.loading = false;
      })
      .addCase(fetchAddComment.fulfilled, (state, action) => {
        state.loading = true;
        state.comments = [...state.comments, action.payload];
      })
      .addCase(fetchAddComment.rejected, (state) => {
        state.loading = true;
        state.error = 'Something went wrong';
      })
      .addCase(fetchRemoveComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (comment) => comment.id !== action.payload,
        );
      });
  },
});

export default commentsSlice.reducer;
export const { setComment, setComments, removeComment } = commentsSlice.actions;
