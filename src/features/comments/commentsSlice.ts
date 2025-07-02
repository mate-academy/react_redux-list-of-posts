/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

export interface CommentsState {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
  visible: boolean;
}

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
  visible: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const data = await getPostComments(postId);

    return data;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    toggleVisible: state => {
      state.visible = !state.visible;
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    removeComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
    clearComments: state => {
      state.comments = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.comments = action.payload;
          state.loaded = true;
          state.visible = false;
        },
      )
      .addCase(fetchComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { toggleVisible, clearComments, addComment, removeComment } =
  commentsSlice.actions;

export default commentsSlice.reducer;

export const createNewComment = createAsyncThunk(
  'comments/createComment',
  async (data: Omit<Comment, 'id'>, { dispatch }) => {
    const newComment = await createComment(data);

    dispatch(addComment(newComment));

    return newComment;
  },
);

export const deleteCommentById = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number, { dispatch }) => {
    await deleteComment(commentId);

    dispatch(removeComment(commentId));

    return commentId;
  },
);
