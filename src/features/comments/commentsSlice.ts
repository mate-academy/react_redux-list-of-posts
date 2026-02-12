/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createComment, getPostComments, deleteComment } from './commentsAPI';
import { Comment, CommentData } from '../../types/Comment';

export interface CommentsState {
  items: Comment[];
  commentsLoaded: boolean;
  commentsError: boolean;
  visible: boolean;
}

const initialState: CommentsState = {
  items: [],
  commentsLoaded: false,
  commentsError: false,
  visible: false,
};

export const init = createAsyncThunk(
  'comments/getPostComments',
  async (postId: number) => {
    const value: Comment[] = await getPostComments(postId);

    return value;
  },
);

export const removeComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ name, email, body, postId }: CommentData & { postId: number }) => {
    const value = await createComment({
      name,
      email,
      body,
      postId,
    });

    return value;
  },
);

export const commentsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(init.pending, (state: CommentsState) => {
        state.commentsLoaded = false;
        state.commentsError = false;
        state.visible = false;
      })
      .addCase(
        init.fulfilled,
        (state: CommentsState, action: PayloadAction<Comment[] | []>) => {
          state.commentsLoaded = true;
          state.items = action.payload;
        },
      )
      .addCase(init.rejected, (state: CommentsState) => {
        state.commentsLoaded = false;
        state.commentsError = true;
      })
      .addCase(
        addComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.items.push(action.payload);
        },
      )
      .addCase(
        removeComment.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter(
            comment => comment.id !== action.payload,
          );
        },
      );
  },
});

export const { setVisible } = commentsSlice.actions;
export default commentsSlice.reducer;
