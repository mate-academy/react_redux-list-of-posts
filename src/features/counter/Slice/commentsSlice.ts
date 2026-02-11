import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from './../../../types/Comment';
import { getPostComments } from '../../../api/comments';

type CommentsState = {
  items: Comment[];
  isLoading: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [] as Comment[],
  isLoading: false,
  hasError: false,
};

export const loadComments = createAsyncThunk<Comment[], number>(
  'comments/loadComments',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

const commentsSlice = createSlice({
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
        isLoading: action.payload,
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
