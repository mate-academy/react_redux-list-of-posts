import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import * as commentsApi from '../../api/comments';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../../app/store';

export type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const initComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    const comments = await commentsApi.getPostComments(postId);

    return comments;
  },
);

export const addComment = createAsyncThunk(
  'comments/create',
  async (commentData: Omit<Comment, 'id'>) => {
    const newComment = await commentsApi.createComment(commentData);

    return newComment;
  },
);

/* eslint-disable no-param-reassign */
export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initComments.pending, (state) => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(initComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.loaded = true;
        state.items = action.payload;
      });

    builder.addCase(initComments.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(addComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.items.push(action.payload);
      });

    builder.addCase(addComment.rejected, (state) => {
      state.hasError = true;
    });
  },
});

export const { remove } = commentsSlice.actions;

export const selectComments = (state: RootState) => state.comments;

export const deleteComment = (commentId: number): AppThunk => {
  return (dispatch) => {
    dispatch(remove(commentId));

    commentsApi.deleteComment(commentId);
  };
};

export default commentsSlice.reducer;
