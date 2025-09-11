/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as commentsApi from '../../api/comments';
import { Comment } from '../../types/Comment';
import { RootState } from '../../app/store';

type State = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: State = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadCommentsByPost = createAsyncThunk(
  'comments/loadByPost',
  async (postId: number) => {
    return commentsApi.getPostComments(postId);
  },
);

export const addNewComment = createAsyncThunk(
  'comments/add',
  async (data: Omit<Comment, 'id'>) => {
    return commentsApi.createComment(data);
  },
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);
const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadCommentsByPost.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(loadCommentsByPost.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(
      loadCommentsByPost.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.loaded = true;
        state.items = action.payload;
      },
    );

    builder.addCase(addNewComment.pending, state => {
      state.hasError = false;
    });

    builder.addCase(addNewComment.rejected, state => {
      state.hasError = true;
    });

    builder.addCase(
      addNewComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.items.push(action.payload);
      },
    );

    builder.addCase(
      deleteComment.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.loaded = true;
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
      },
    );
  },
});

export const selectComments = (state: RootState) => state.comments;
export const { setError } = commentsSlice.actions;
export default commentsSlice.reducer;
