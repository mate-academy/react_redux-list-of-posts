/* eslint-disable no-param-reassign */
import {
  Dispatch,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import * as commentApi from '../../api/comments';

type CommentsState = {
  loaded: boolean,
  hasError: boolean,
  items: Comment[]
};

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return commentApi.getPostComments(postId);
});

export const addComment = createAsyncThunk(
  'comments/add', async (data: Omit<Comment, 'id'>) => {
    const response = await commentApi.createComment(data);

    return response;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    take: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(
      init.fulfilled, (state, action: PayloadAction<Comment[]>) => {
        state.items = action.payload;
        state.loaded = true;
      },
    );

    builder.addCase(init.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(
      addComment.fulfilled, (state, action: PayloadAction<Comment>) => {
        state.items.push(action.payload);
      },
    );
  },
});

export const { take } = commentsSlice.actions;
export default commentsSlice.reducer;

export const deleteComment = (commentId: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(take(commentId));
    await commentApi.deleteComment(commentId);
  };
};
