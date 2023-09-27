/* eslint-disable no-param-reassign */
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

type CommentsState = {
  comments: Comment[];
  loading: boolean;
  error: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: false,
};

// prettier-ignore
export const fetchComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => getPostComments(postId),
);

export const createNewComment = createAsyncThunk(
  'comments/add',
  (comment: Omit<Comment, 'id'>) => createComment(comment),
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    remove: (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload,
      );

      deleteComment(action.payload);
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<CommentsState>) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });

    builder.addCase(createNewComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });
  },
});

export const { remove } = commentsSlice.actions;
export default commentsSlice.reducer;
