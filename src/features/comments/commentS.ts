import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentsApi from '../../api/comments';
import { Comment } from '../../types/Comment';

type CommentsState = {
  comments: Comment[];
  loading: boolean,
  submitLoading: boolean,
  error: string,
};

const initialState: CommentsState = {
  comments: [],
  loading: false,
  submitLoading: false,
  error: '',
};

export const initComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return commentsApi.getPostComments(postId);
  },
);

export const initAddComment = createAsyncThunk(
  'comments/add',
  (comment: Omit<Comment, 'id'>) => {
    return commentsApi.createComment(comment);
  },
);

export const initRemoveComment = createAsyncThunk(
  'comments/delete',
  (commentId: number) => {
    return commentsApi.deleteComment(commentId);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    removeComment: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        comments: state.comments
          .filter((comment) => comment.id !== action.payload),
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initComments.pending, (state) => {
      return {
        ...state,
        error: '',
        loading: true,
      };
    });

    builder.addCase(initComments.fulfilled, (state, action) => {
      return {
        ...state,
        comments: action.payload,
        loading: false,
      };
    });

    builder.addCase(initComments.rejected, (state) => {
      return {
        ...state,
        loading: false,
        error: 'Something went wrong',
      };
    });

    builder.addCase(initAddComment.pending, (state) => {
      return {
        ...state,
        error: '',
        submitLoading: true,
      };
    });

    builder.addCase(initAddComment.fulfilled, (state, action) => {
      return {
        ...state,
        comments: [...state.comments, action.payload],
        submitLoading: false,
      };
    });

    builder.addCase(initAddComment.rejected, (state) => {
      return {
        ...state,
        submitLoading: false,
        error: 'Something went wrong',
      };
    });

    builder.addCase(initRemoveComment.fulfilled, (state, action) => {
      return {
        ...state,
        comments: state.comments
          .filter((comment) => comment.id !== action.payload),
      };
    });
  },
});

export default commentsSlice.reducer;

export const { removeComment } = commentsSlice.actions;
