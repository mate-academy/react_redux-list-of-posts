import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  createComment, deleteComment, getPostComments,
} from '../../api/comments';

type Comments = {
  comments: Comment[],
  isLoading: boolean,
  hasError: boolean,
};

const initialState: Comments = {
  comments: [],
  isLoading: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetch', (id: number) => {
    return getPostComments(id);
  },
);

export const addComment = createAsyncThunk(
  'comments/add', (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

export const delComment = createAsyncThunk(
  'comments/delete', (id: number) => {
    return deleteComment(id);
  },
);

const postSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    removeComment: (state, action) => {
      return {
        ...state,
        comments: state.comments
          .filter(comment => comment.id !== action.payload),
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      return {
        ...state,
        comments: action.payload,
        isLoading: false,
        hasError: false,
      };
    });
    builder.addCase(fetchComments.rejected, (state) => {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    });
    builder.addCase(addComment.pending, state => {
      return {
        ...state,
        isSubmitting: true,
        hasError: false,
      };
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      return {
        ...state,
        comments: [...state.comments, action.payload],
        isSubmitting: false,
        hasError: false,
      };
    });
    builder.addCase(delComment.fulfilled, (state, action) => {
      return {
        ...state,
        comments: state.comments
          .filter(comment => comment.id !== action.payload),
        hasError: false,
      };
    });
  },
});

export default postSlice.reducer;
export const { removeComment } = postSlice.actions;
