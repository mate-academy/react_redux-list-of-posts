import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  createComment,
  getPostComments,
  deleteComment,
} from '../../api/comments';

type CommentState = {
  comments: Comment[],
  loaded: boolean,
  hasError: boolean,
};
type MetaAction = {
  meta: any
};
const initialState: CommentState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk('load/comments', getPostComments);
export const addComment = createAsyncThunk('add/comment', createComment);
export const removeComment = createAsyncThunk('delete/comment', deleteComment);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialState as CommentState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(init.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.comments = action.payload;
        state.loaded = true;
      });

    builder.addCase(init.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(addComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.comments.push(action.payload);
        state.loaded = true;
      });

    builder.addCase(removeComment.fulfilled,
      (state, action: MetaAction) => {
        const deletedCommentId = action.meta.arg;

        state.comments = state.comments
          .filter(comment => comment.id !== deletedCommentId);
        state.loaded = true;
      });
  },
});

export const { setComments } = commentsSlice.actions;
export default commentsSlice.reducer;
