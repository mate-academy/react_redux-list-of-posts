import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';
import * as commentsApi from '../api/comments';

export interface CommentsState {
  items: Comment[],
  loaded: boolean,
  hasError: boolean,
}
const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const value = await getPostComments(postId);

    return value;
  },
);
export const addComment = createAsyncThunk(
  'comments/add', (data: Omit<Comment, 'id'>) => {
    return commentsApi.createComment(data);
  },
);
export const deleteComment = createAsyncThunk(
  'commetns/delete', (commentId: number) => {
    return commentsApi.deleteComment(commentId);
  },
);
export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    removeComment: (state, action) => {
      return {
        ...state,
        items: state.items
          .filter(comment => comment.id !== action.payload),
      };
    },
    clearComments: (state) => {
      return {
        ...state,
        items: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        return {
          ...state,
          loaded: false,
          hasError: false,
        };
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        return {
          ...state,
          items: action.payload,
          loaded: true,
          hasError: false,
        };
      })
      .addCase(fetchComments.rejected, (state) => {
        return {
          ...state,
          loaded: true,
          hasError: true,
        };
      })
      .addCase(addComment.fulfilled, (state, action) => {
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      })
      .addCase(addComment.rejected, (state) => {
        return {
          ...state,
          hasError: true,
        };
      })
      .addCase(deleteComment.fulfilled, (state) => {
        return {
          ...state,
          hasError: false,
        };
      });
  },
});

export const { removeComment, clearComments } = commentsSlice.actions;

export default commentsSlice.reducer;
