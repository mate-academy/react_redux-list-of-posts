/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { IComment, ICommentDataToServer } from '../types/Comment';
import { Status } from '../types/Status.enum';

type State = {
  comments: IComment[];
  status: Status;
};

const initialState: State = {
  comments: [],
  status: Status.INIT,
};

export const fetchComments = createAsyncThunk('comments/fetchComments', async (
  postId: number,
) => {
  const comments = await getPostComments(postId);

  return comments;
});

export const addComment = createAsyncThunk('comments/addComment', async (
  data: ICommentDataToServer,
) => {
  const newComment = await createComment(data);

  return newComment;
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    removeCommentsFromState: () => {
      return initialState;
    },
    removeComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(comment => (
        action.payload !== comment.id
      ));

      deleteComment(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.status = Status.OK;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.status = Status.ERROR;
      })
      .addCase(fetchComments.pending, (state) => {
        state.status = Status.LOADING;
      });
    builder
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      });
  },
});

export const { removeCommentsFromState, removeComment } = commentsSlice.actions;
export default commentsSlice.reducer;
