import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Comment } from '../../types/Comment';
import { getPostComments } from '../../api/comments';

export interface Comments {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: Comments = {
  comments: [],
  loaded: true,
  hasError: false,
};

export const loadComments = createAsyncThunk(
  'comments/loadComments',
  async (id: number) => {
    const comments = getPostComments(id);

    return comments;
  },
);

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addNewComment: (state, action: PayloadAction<Comment>) => {
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        comments: [...state.comments].filter(
          comment => comment.id !== action.payload,
        ),
      };
    },

    setError: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        hasError: action.payload,
      };
    },
  },

  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, state => {
        return { ...state, loaded: false };
      })
      .addCase(
        loadComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          return { ...state, comments: action.payload, loaded: true };
        },
      )
      .addCase(loadComments.rejected, state => {
        return { ...state, hasError: true, loaded: true };
      });
  },
});

export const { addNewComment, deleteComment, setError } = commentSlice.actions;

export default commentSlice.reducer;
