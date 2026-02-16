/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { deleteComment, getPostComments } from '../api/comments';

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [] as Comment[],
  loaded: false,
  hasError: false,
};

export const loadCommentsByPostId = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    const value = await getPostComments(postId);

    return value;
  },
);

export const deleteCommentById = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    const value = await deleteComment(commentId);

    return value;
  },
);

// export const addNewComment = createAsyncThunk(
//   'comments/add',
//   async (payload: { commentData: CommentData; postId: number }) => {
//     const { name, email, body } = payload.commentData;

//     const newComment = await createComment({
//       name,
//       email,
//       body,
//       postId: payload.postId,
//     });

//     return newComment;
//   },
// );

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addNewComment: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    deleteCommentAction: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadCommentsByPostId.pending, state => {
        state.loaded = false;
      })
      .addCase(loadCommentsByPostId.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(loadCommentsByPostId.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      })

      .addCase(deleteCommentById.fulfilled, state => {
        state.hasError = false;
        state.loaded = true;
      })
      .addCase(deleteCommentById.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const { deleteCommentAction, addNewComment, setError } =
  commentsSlice.actions;
export default commentsSlice.reducer;
