/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, getPostComments, deleteComment } from '../api/comments';
import { Comment } from '../types/Comment';

type InitialState = {
  comments: Comment[];
  loading: boolean;
  error: string;
  lastDeletedComment?: Comment | null;
};

const initialState: InitialState = {
  comments: [],
  loading: false,
  error: '',
  lastDeletedComment: null,
};

export const loadComments = createAsyncThunk('comments/fetch', (id: number) => {
  return getPostComments(id);
});

export const addPostComment = createAsyncThunk(
  'comments/add',
  (payload: Omit<Comment, 'id'>) => {
    return createComment(payload);
  },
);

export const deletePostComment = createAsyncThunk(
  'comments/delete',
  (commentId: number) => {
    return deleteComment(commentId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments(state) {
      state.comments = [];
      state.error = '';
      state.loading = false;
    },
  },
  extraReducers: builder => {
    //#region load
    builder.addCase(loadComments.pending, state => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    });

    builder.addCase(loadComments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to load comments';
    });
    //#endregion

    //#region add
    builder.addCase(addPostComment.pending, state => {
      state.error = '';
    });
    builder.addCase(addPostComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });
    builder.addCase(addPostComment.rejected, (state, action) => {
      state.error = action.error.message || 'Failed to add comment';
    });
    //#endregion

    //#region delete
    builder.addCase(deletePostComment.pending, (state, action) => {
      const id = action.meta.arg;
      const index = state.comments.findIndex(comment => comment.id === id);

      if (index !== -1) {
        state.lastDeletedComment = {
          ...state.comments[index],
          _index: index,
        } as Comment & { _index: number };
        state.comments.splice(index, 1);
      }
    });

    builder.addCase(deletePostComment.rejected, state => {
      const comment = state.lastDeletedComment as
        | (Comment & { _index: number })
        | null;

      if (comment) {
        state.comments.splice(comment._index, 0, comment);
        state.lastDeletedComment = null;
      }
    });

    //#endregion
  },
});

export const commentsReducer = commentsSlice.reducer;
export const { clearComments } = commentsSlice.actions;
