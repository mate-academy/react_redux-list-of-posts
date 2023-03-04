import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type CommentsState = {
  comments: Comment[],
  loading: boolean,
  error: string,
};

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    },
    error: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        error: action.payload,
      };
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment.id !== action.payload,
        ),
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(init.fulfilled, (state, action) => {
      return {
        ...state,
        comments: action.payload,
        loading: false,
      };
    });

    builder.addCase(init.rejected, (state) => {
      return {
        ...state,
        error: 'Error',
        loading: false,
      };
    });
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
