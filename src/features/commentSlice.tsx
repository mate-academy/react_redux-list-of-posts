import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

export const fetchComment = createAsyncThunk('comment/fetch', (id: number) => {
  return getPostComments(id);
});

export const fetchDeleteComment = createAsyncThunk(
  'comment/delete',
  (id: number) => {
    return deleteComment(id);
  },
);

export const fetchAddComment = createAsyncThunk(
  'comment/add',
  (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

export interface CommentState {
  comments: Comment[];
  isLoader: boolean;
  isError: boolean;
}

const initialState: CommentState = {
  comments: [],
  isLoader: false,
  isError: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    removeComment: (state, action) => {
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment.id !== action.payload,
        ),
      };
    },

    clearComments: state => {
      return {
        ...state,
        comments: [],
      };
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchComment.pending, state => {
        return {
          ...state,
          isLoader: true,
          isError: false,
        };
      })

      .addCase(fetchComment.fulfilled, (state, action) => {
        return {
          ...state,
          comments: action.payload,
          isLoader: false,
        };
      })

      .addCase(fetchComment.rejected, state => {
        return {
          ...state,
          isError: true,
          isLoader: false,
        };
      })

      .addCase(fetchDeleteComment.fulfilled, state => {
        return {
          ...state,
        };
      })

      .addCase(fetchAddComment.fulfilled, (state, action) => {
        return {
          ...state,
          comments: [...state.comments, action.payload],
        };
      });
  },
});
export default commentsSlice.reducer;
export const { removeComment, clearComments } = commentsSlice.actions;
