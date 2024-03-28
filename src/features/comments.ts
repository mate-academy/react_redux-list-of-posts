/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments, deleteComment } from '../api/comments';
import { deleteItemFromArray, addItemToArray } from '../utils/functions';
import { postComment } from './newComment';

type CommentsState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialComments: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const getComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const delComment = createAsyncThunk('comments/del', (comment: Comment['id']) => {
  return deleteComment(comment);
});

export const postsSlice = createSlice({
  name: 'comments',
  initialState: initialComments,
  reducers: {
    set: (state, action: PayloadAction<Comment[]>) => {
      return { ...state, comments: action.payload };
    },
    add: (state, action: PayloadAction<Comment>) => {
      const commentsWithNew = addItemToArray(state.comments, action.payload);

      return { ...state, comments: commentsWithNew };
    },
    del: (state, action: PayloadAction<number>) => {
      const commentsWithoutDeleted = deleteItemFromArray(state.comments, 'id', action.payload);

      return {
        ...state,
        comments: commentsWithoutDeleted,
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(getComments.fulfilled, (state, action) => {
      return {
        ...state,
        comments: action.payload,
        loaded: true,
      };
    });
    builder.addCase(getComments.rejected, state => {
      return {
        ...state,
        hasError: true,
      };
    });
    builder.addCase(delComment.fulfilled, (state, action) => {
      const idToDelete = action.meta.arg;
      const commentsWithoutDeleted = deleteItemFromArray(state.comments, 'id', idToDelete);

      return {
        ...state,
        comments: commentsWithoutDeleted,
      };
    });
    builder.addCase(delComment.rejected, (state) => {
      return {
        ...state,
        hasError: true,
      };
    });
    builder.addCase(postComment.fulfilled, (state, action) => {
      const commentsWithAdded = addItemToArray(state.comments, action.payload);

      return {
        ...state,
        comments: commentsWithAdded,
      };
    });
  },
});

export const { set, add, del } = postsSlice.actions;

export default postsSlice.reducer;
