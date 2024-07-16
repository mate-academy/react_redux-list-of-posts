import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { deleteComment, getPostComments } from '../api/comments';
import { postComment } from './newComments';

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
  'commets/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const delComment = createAsyncThunk(
  'comments/del',
  (comment: Comment['id']) => {
    return deleteComment(comment);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialComments,
  reducers: {
    set: (state, action: PayloadAction<Comment[]>) => {
      return {
        ...state,
        comments: action.payload,
      };
    },
    add: (state, action: PayloadAction<Comment>) => {
      const addItem = [...state.comments, action.payload];

      return {
        ...state,
        comments: addItem,
      };
    },
    del: (state, action: PayloadAction<number>) => {
      const filterCommets = state.comments.filter(
        item => item.id !== action.payload,
      );

      return {
        ...state,
        comments: filterCommets,
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(getComments.pending, state => {
      return {
        ...state,
        loaded: false,
      };
    });
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
        loaded: true,
        hasError: true,
      };
    });
    builder.addCase(delComment.fulfilled, (state, action) => {
      const idToDelete = action.meta.arg;

      const filterCommets = state.comments.filter(
        item => item.id !== idToDelete,
      );

      return {
        ...state,
        comments: filterCommets,
      };
    });
    builder.addCase(delComment.rejected, state => {
      return {
        ...state,
        hasError: true,
        loaded: true,
      };
    });
    builder.addCase(postComment.fulfilled, (state, action) => {
      const commentsWithAdded = [...state.comments, action.payload];

      return {
        ...state,
        comments: commentsWithAdded,
      };
    });
  },
});

export const { set, add, del } = commentsSlice.actions;

export default commentsSlice.reducer;
