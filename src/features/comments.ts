import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'comments/add',
  (commentData: CommentData & { postId: number }) => createComment(commentData),
);

export const deleteComments = createAsyncThunk(
  'comments/delete',
  (commentId: number) => {
    deleteComment(commentId);

    return commentId;
  },
);

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: string;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: '',
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      return {
        ...state,
        loaded: true,
      };
    });

    builder.addCase(fetchComments.fulfilled, (state, action) => {
      return {
        ...state,
        loaded: false,
        items: action.payload,
      };
    });

    builder.addCase(fetchComments.rejected, state => {
      return {
        ...state,
        loaded: false,
        hasError: 'Something went wrong',
      };
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    });

    builder.addCase(deleteComments.fulfilled, (state, action) => {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    });
  },
});

export default commentsSlice.reducer;
