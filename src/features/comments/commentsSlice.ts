import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentsApi from '../../api/comments';
import { Comment } from '../../types/Comment';

type CommentsState = {
  loaded: boolean,
  hasError: boolean,
  items: Comment[],
};

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  commentsApi.getPostComments,
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loaded: action.payload,
      };
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    },
    removeComment: (state, action: PayloadAction<number>) => {
      const commentId = action.payload;

      return {
        ...state,
        items: state.items.filter(comment => comment.id !== commentId),
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      const newState: CommentsState = {
        ...state,
        items: action.payload,
        loaded: true,
      };

      return newState;
    });

    builder.addCase(fetchComments.pending, (state) => {
      const newState: CommentsState = {
        ...state,
        loaded: false,
      };

      return newState;
    });

    builder.addCase(fetchComments.rejected, (state) => {
      const newState: CommentsState = {
        ...state,
        loaded: true,
        hasError: true,
      };

      return newState;
    });
  },
});

export const commentsReducer = commentsSlice.reducer;
export const { setError, removeComment, addComment } = commentsSlice.actions;
