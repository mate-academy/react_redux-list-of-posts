import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import * as CommentsApi from '../api/comments';
import { Comment } from '../types/Comment';

type CommentState = {
  items: Comment[];
  isLoading: boolean;
  errorMessage: boolean;
};

const initialState: CommentState = {
  items: [],
  isLoading: false,
  errorMessage: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const value = await getPostComments(postId);

    return value;
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  (data: Omit<Comment, 'id'>) => {
    return CommentsApi.createComment(data);
  },
);

export const deleteComents = createAsyncThunk(
  'comments/delete',
  (commentId: number) => {
    return CommentsApi.deleteComment(commentId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    removeComment: (state, action) => {
      return {
        ...state,
        items: state.items.filter(comment => comment.id !== action.payload),
      };
    },

    clearComment: state => {
      return {
        ...state,
        items: [],
      };
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        return {
          ...state,
          isLoading: false,
          errorMessage: false,
        };
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        return {
          ...state,
          items: action.payload,
          isLoading: true,
          errorMessage: false,
        };
      })
      .addCase(fetchComments.rejected, state => {
        return {
          ...state,
          isLoading: true,
          errorMessage: true,
        };
      })
      .addCase(addComment.fulfilled, (state, action) => {
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      })
      .addCase(addComment.rejected, state => {
        return {
          ...state,
          errorMessage: true,
        };
      })
      .addCase(deleteComents.fulfilled, state => {
        return {
          ...state,
          errorMessage: false,
        };
      });
  },
});

export const { removeComment, clearComment } = commentsSlice.actions;
export default commentsSlice.reducer;
