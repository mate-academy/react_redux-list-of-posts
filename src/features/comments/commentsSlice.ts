import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { createComment, deleteComment, getPostComments }
  from '../../api/comments';

type CommentsState = {
  comments: Comment[],
  comment: Comment | null,
  isLoading: boolean,
  hasError: boolean,
};

const initialState: CommentsState = {
  comments: [],
  comment: null,
  isLoading: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/getComments', (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment', (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

export const removeComment = createAsyncThunk(
  'comments/deleteComment', (commentId: number | undefined) => {
    return deleteComment(commentId);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Comment>) => {
      state.comments = [...state.comments, action.payload];
    },
    delete: (state, action: PayloadAction<number | undefined>) => {
      state.comments
        = state.comments.filter(comment => comment.id !== action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchComments.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.isLoading = false;
    });

    builder.addCase(fetchComments.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
