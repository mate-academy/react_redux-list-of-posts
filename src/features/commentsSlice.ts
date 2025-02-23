import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

export type CommentState = {
  comments: Comment[];
  loading: boolean;
  error: boolean;
};

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  (postId: number) => getPostComments(postId),
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addNewComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    removeComment: (state, action: PayloadAction<number>) => {
      // eslint-disable-next-line no-param-reassign
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
    changeError: state => {
      // eslint-disable-next-line no-param-reassign
      state.error = true;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      return { ...state, loading: false };
    });
    builder.addCase(
      fetchComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        return {
          ...state,
          comments: action.payload,
          loading: true,
        };
      },
    );
    builder.addCase(fetchComments.rejected, state => {
      return {
        ...state,
        loading: true,
        error: true,
      };
    });
  },
});

export const { addNewComment, removeComment, changeError } =
  commentsSlice.actions;
export default commentsSlice.reducer;
