import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type CommentsState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
  visible: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loaded: true,
  hasError: false,
  visible: false,
};

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    remove: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment.id !== action.payload,
        ),
      };
    },
    open: state => {
      return {
        ...state,
        visible: true,
      };
    },
    add: (state, action: PayloadAction<Comment>) => {
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      return {
        ...state,
        visible: false,
        loaded: false,
      };
    });

    builder.addCase(init.fulfilled, (state, action) => {
      return {
        ...state,
        comments: action.payload,
        visible: false,
        loaded: true,
      };
    });

    builder.addCase(init.rejected, state => {
      return {
        ...state,
        hasError: true,
        visible: false,
        loaded: false,
      };
    });
  },
});

export default commentsSlice.reducer;
export const { remove, open, add } = commentsSlice.actions;
