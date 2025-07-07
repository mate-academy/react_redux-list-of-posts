import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type State = {
  value: Comment[] | null;
  isLoading: boolean;
  error: null | string;
};

const initialState: State = {
  value: [],
  isLoading: false,
  error: null,
};

export const initComments = createAsyncThunk(
  'comment/fetch',
  (userId: number) => {
    return getPostComments(userId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    getComments: (state, action: PayloadAction<Comment[]>) => {
      return {
        ...state,
        value: action.payload,
      };
    },
    clearComments: state => {
      return {
        ...state,
        value: [],
      };
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      return {
        ...state,
        value: [...(state.value || []), action.payload],
      };
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        value: (state.value || []).filter(
          comment => comment.id !== action.payload,
        ),
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(initComments.pending, state => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(initComments.fulfilled, (state, action) => {
      return {
        ...state,
        value: action.payload,
        isLoading: false,
      };
    });
    builder.addCase(initComments.rejected, state => {
      return {
        ...state,
        error: 'Something went wrong',
        isLoading: false,
      };
    });
  },
});
