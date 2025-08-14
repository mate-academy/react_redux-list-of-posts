/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/return-await */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
import { Comment, CommentData } from '../../types/Comment';
import { RootState } from '../../app/store';

export const loadComments = createAsyncThunk(
  'comments/loadComments',

  async (postId: number) => {
    return await getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/addComments',

  async (commentData: CommentData & { postId: number }) => {
    return await createComment(commentData);
  },
);

export const removeComment = createAsyncThunk(
  'comments/removeComments',

  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

const initialState = {
  items: [] as Comment[],
  loaded: false,
  hasError: false,
  visible: false,
  adding: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
    showCommentsForm: state => {
      state.visible = true;
    },
    hideCommentsForm: state => {
      state.visible = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
        state.hasError = false;
        state.visible = false;
      })
      .addCase(loadComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(addComment.pending, state => {
        state.hasError = false;
        state.adding = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loaded = true;
        state.hasError = false;
        state.visible = false;
        state.adding = false;
      })
      .addCase(addComment.rejected, state => {
        state.hasError = true;
        state.adding = false;
      })
      .addCase(removeComment.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
        state.hasError = false;
      })
      .addCase(removeComment.rejected, state => {
        state.hasError = true;
      });
  },
});

export const selectComments = (state: RootState) => state.comments.items;
export const selectCommentsLoaded = (state: RootState) => state.comments.loaded;
export const selectCommentsError = (state: RootState) =>
  state.comments.hasError;
export const selectCommentsVisible = (state: RootState) =>
  state.comments.visible;
export const selectCommentsAdding = (state: RootState) => state.comments.adding;

export default commentsSlice.reducer;
export const { setVisible, showCommentsForm, hideCommentsForm } =
  commentsSlice.actions;
