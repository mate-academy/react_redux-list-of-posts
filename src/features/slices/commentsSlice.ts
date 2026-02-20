/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
import { Comment, CommentData } from '../../types/Comment';

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  async (postId: Post['id']) => getPostComments(postId),
);

export const addCommentAsync = createAsyncThunk(
  'comments/add',
  async (commentData: CommentData & { postId: number }) => {
    const newComment = await createComment(commentData);

    return newComment;
  },
);

export const deleteCommentAsync = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
  visible: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
  visible: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },

    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
        state.visible = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
        state.visible = false;
      })
      .addCase(fetchComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
        state.visible = true;
      })
      .addCase(addCommentAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addCommentAsync.rejected, state => {
        state.hasError = true;
      })
      .addCase(deleteCommentAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
      })
      .addCase(deleteCommentAsync.rejected, state => {
        state.hasError = true;
      });
  },
});

export default commentsSlice.reducer;
export const { setVisible, setError } = commentsSlice.actions;
