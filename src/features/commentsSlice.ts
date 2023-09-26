/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

export interface CommentsState {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'commets/fetchComments',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (data: Omit<Comment, 'id'>) => {
    const newComment = await createComment(data);

    return newComment;
  },
);

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

const commnetsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state: CommentsState, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },

    immediateDeleteComment: (
      state: CommentsState,
      action: PayloadAction<number>,
    ) => {
      state.comments = state.comments.filter((c) => c.id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.hasError = false;
        state.loaded = false;
      })

      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.comments = action.payload;
          state.loaded = true;
        },
      )

      .addCase(fetchComments.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
      })

      .addCase(
        addComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.comments.push(action.payload);
        },
      )

      .addCase(addComment.rejected, (state) => {
        state.hasError = true;
      })

      .addCase(
        removeComment.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.comments = state.comments.filter(
            (comment) => comment.id !== action.payload,
          );
        },
      );
  },
});

export const { setComments, immediateDeleteComment } = commnetsSlice.actions;
export default commnetsSlice.reducer;
