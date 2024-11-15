import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

type CommentsState = {
  comments: Comment[];
  loaded: boolean;
  error: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  error: false,
};

export const addComment = createAsyncThunk(
  'comments/add',
  (comment: Omit<Comment, 'id'>) => {
    return createComment(comment);
  },
);

export const removeComment = createAsyncThunk(
  'comments/remove',
  (commentId: number) => {
    return deleteComment(commentId);
  },
);

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deleteCurrentComment: (state, action: PayloadAction<number>) => {
      // eslint-disable-next-line no-param-reassign
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
      // eslint-disable-next-line no-param-reassign
      state.comments = action.payload;
    });
    builder.addCase(fetchComments.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
      // eslint-disable-next-line no-param-reassign
      state.error = true;
    });
    builder.addCase(
      addComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.comments.push(action.payload);
      },
    );
    builder.addCase(addComment.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.error = true;
    });
  },
});

export default commentsSlice.reducer;
export const { deleteCurrentComment } = commentsSlice.actions;
