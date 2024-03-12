import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';
/* eslint-disable no-param-reassign */

export const init = createAsyncThunk('post/fetchComments', (postId: number) => {
  return getPostComments(postId);
});

type ComState = {
  comments: Comment[];
  loading: boolean;
  error: string;
  visible: boolean;
  commentError: boolean;
};

const initialState: ComState = {
  comments: [],
  loading: false,
  error: '',
  visible: false,
  commentError: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: state => {
      state.comments = [];
    },
    setVisible: state => {
      state.visible = true;
    },
    clearVisible: state => {
      state.visible = false;
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments = [action.payload, ...state.comments];
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
    setError: state => {
      state.commentError = true;
    },
    clearError: state => {
      state.commentError = false;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(init.pending, state => {
        state.loading = true;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(init.rejected, state => {
        state.loading = false;
        state.error = 'Error ';
        state.commentError = true;
      });
  },
});
export const {
  setVisible,
  clearVisible,
  addComment,
  deleteComment,
  setError,
  clearError,
  setComments,
} = commentsSlice.actions;
export default commentsSlice.reducer;
