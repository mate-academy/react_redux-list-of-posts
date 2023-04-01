/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getPostComments, createComment, deleteComment } from '../api/comments';
import { Comment } from '../types/Comment';

type StateComments = {
  comments: Comment[];
  visible: boolean;
  loaded: boolean;
  hasError: boolean;
};

const initialState: StateComments = {
  comments: [],
  loaded: false,
  hasError: false,
  visible: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'addComments/fetch',
  async (comment: Omit<Comment, 'id'>) => createComment(comment),
);

export const removeCommentFromServer = createAsyncThunk(
  'removeComment/fetch',
  async (commentId: number) => {
    const res = await deleteComment(commentId);

    return res;
  },
);

const commentsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setVisible(state, action: PayloadAction<boolean>) {
      state.visible = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loaded = false;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.loaded = false;
        state.hasError = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      });

    builder.addCase(removeCommentFromServer.pending, (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.meta.arg,
      );
    });
  },
});

export default commentsSlice.reducer;
export const { setVisible } = commentsSlice.actions;
