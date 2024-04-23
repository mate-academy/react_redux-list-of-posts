/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

type CommentsState = {
  comments: Comment[];
  loading: boolean;
  hasError: boolean;
  visible: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loading: false,
  hasError: false,
  visible: false,
};

export const initComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },

    clear: state => {
      state.comments = [];
    },

    deleteComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },

    setVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(initComments.pending, state => {
        state.loading = false;
        state.hasError = false;
        state.comments = [];
      })
      .addCase(initComments.fulfilled, (state, action) => {
        state.loading = true;
        state.comments = action.payload;
      })
      .addCase(initComments.rejected, state => {
        state.loading = true;
        state.hasError = true;
        state.comments = [];
      });
  },
});

export const { add, clear, deleteComment, setVisible, setLoading, setError } =
  commentsSlice.actions;

export default commentsSlice.reducer;
