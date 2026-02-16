import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

export const loadComments = createAsyncThunk<Comment[], number>(
  'comments/loadComments',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

const initialState = {
  items: [] as Comment[],
  loaded: false,
  hasError: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Comment[]>) => {
      return {
        ...state,
        items: action.payload,
      };
    },
    setError: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        hasError: action.payload,
      };
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loaded: action.payload,
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(loadComments.pending, () => {
      return {
        items: [],
        loaded: false,
        hasError: false,
      };
    });

    builder.addCase(
      loadComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        return {
          ...state,
          items: action.payload,
          loaded: true,
          hasError: false,
        };
      },
    );

    builder.addCase(loadComments.rejected, state => {
      return {
        ...state,
        loaded: true,
        hasError: true,
      };
    });
  },
});

export const { setItems, setError, setLoaded } = commentsSlice.actions;
