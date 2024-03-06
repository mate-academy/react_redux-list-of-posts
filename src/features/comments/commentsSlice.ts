import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
/* eslint-disable no-param-reassign */

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

export const removeCurrentComment = createAsyncThunk(
  'deleteComments/fetch',
  (id: number) => {
    return deleteComment(id);
  },
);

export const addNewComment = createAsyncThunk(
  'createComente',
  (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

export const loadCommentsData = createAsyncThunk(
  'comments/fetch',
  (id: number) => {
    return getPostComments(id);
  },
);

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    removeComment: (state, action: PayloadAction<number>) => {
      state.items.splice(
        state.items.findIndex(({ id }) => id === action.payload),
        1,
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(loadCommentsData.pending, state => {
      state.loaded = false;
    });
    builder.addCase(loadCommentsData.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
    builder.addCase(loadCommentsData.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });
    builder.addCase(addNewComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
  },
});

export const { removeComment } = commentsSlice.actions;
export default commentsSlice.reducer;
