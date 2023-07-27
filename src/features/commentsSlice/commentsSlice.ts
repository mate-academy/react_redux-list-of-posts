/* eslint no-param-reassign: "error" */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { deleteComment, getPostComments } from '../../api/comments';

type CommentsState = {
  comments: Comment[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: CommentsState = {
  comments: [],
  loaded: true,
  hasError: false,
};

export const getAsyncComments = createAsyncThunk(
  'comments/get',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const removeAsyncComment = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await deleteComment(commentId);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },

    remove: (state, action: PayloadAction<number>) => {
      state.comments = state.comments
        .filter(comment => comment.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAsyncComments.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(getAsyncComments.fulfilled, (state, action) => {
      state.loaded = true;
      state.hasError = false;
      state.comments = action.payload;
    });

    builder.addCase(getAsyncComments.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export const { add, remove } = commentsSlice.actions;

export default commentsSlice.reducer;
