import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { fetchPostComments } from '../servises/api';
import { createComment, deleteComment } from '../api/comments';

type CommentsSlice = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsSlice = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadPostComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return fetchPostComments(postId);
  },
);

export const addNewComment = createAsyncThunk(
  'comments/add',
  async (comment: Omit<Comment, 'id'>) => {
    const value = await createComment(comment);

    return value;
  },
);

export const deleteOneComment = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadPostComments.pending, state => {
      return {
        ...state,
        loaded: false,
        hasError: false,
      };
    });

    builder.addCase(loadPostComments.fulfilled, (state, action) => {
      return {
        ...state,
        items: action.payload,
        loaded: true,
        hasError: false,
      };
    });

    builder.addCase(loadPostComments.rejected, state => {
      return {
        ...state,
        loaded: true,
        hasError: true,
      };
    });
    builder.addCase(addNewComment.fulfilled, (state, action) => {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    });
    builder.addCase(addNewComment.rejected, state => {
      return {
        ...state,
        hasError: true,
      };
    });
    builder.addCase(deleteOneComment.fulfilled, (state, action) => {
      return {
        ...state,
        items: state.items.filter(comment => comment.id !== action.payload),
      };
    });
    builder.addCase(deleteOneComment.rejected, state => {
      return {
        ...state,
        hasError: true,
      };
    });
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
