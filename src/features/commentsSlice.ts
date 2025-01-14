/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type CommentsTypeSlice = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsTypeSlice = {
  items: [],
  loaded: false,
  hasError: false,
};

// Async thunks
export const loadCommentsOfPost = createAsyncThunk(
  'comments/loadCommentsOfPost',
  async (id: number) => {
    return getPostComments(id);
  },
);

export const addCommentsOfPost = createAsyncThunk(
  'comments/addComment',
  async (comment: Omit<Comment, 'id'>) => {
    return createComment(comment);
  },
);

export const deleteCommentsOfPost = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

// Slice
export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addCommentLocally(state, action: PayloadAction<Comment>) {
      state.items.push(action.payload);
    },
    deleteCommentLocally(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadCommentsOfPost.pending, state => {
        state.loaded = false;
      })
      .addCase(loadCommentsOfPost.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(loadCommentsOfPost.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      // .addCase(addCommentsOfPost.fulfilled, (state, action) => {
      //   state.items.push(action.payload);
      // })
      .addCase(addCommentsOfPost.rejected, state => {
        state.hasError = true;
      });
    // .addCase(deleteCommentsOfPost.fulfilled, (state, action) => {
    //   state.items = state.items.filter(
    //     comment => comment.id !== action.payload,
    //   );
    // })
    // .addCase(deleteCommentsOfPost.rejected, state => {
    //   state.hasError = true;
    // });
  },
});

export const { addCommentLocally, deleteCommentLocally } =
  commentsSlice.actions;

export default commentsSlice.reducer;
