import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type CommentsState = {
  comments: Comment[];
  loading: boolean;
  error: string;
  visible: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: '',
  visible: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const deleteCommentById = createAsyncThunk(
  'comments/deleteCommentById',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (newComment: Omit<Comment, 'id'>) => {
    const createdComment = await createComment(newComment);

    return createdComment;
  },
);

export const CommentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    /* eslint-disable no-param-reassign */
    toggleVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      state.loading = true;
      state.visible = false;
    });
    builder.addCase(
      fetchComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.comments = action.payload;
        state.loading = false;
      },
    );
    builder.addCase(fetchComments.rejected, state => {
      state.loading = false;
      state.error = 'Error loading comments';
    });
    builder.addCase(
      deleteCommentById.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.comments = state.comments.filter(
          comment => comment.id !== action.payload,
        );
      },
    );
    builder.addCase(deleteCommentById.rejected, state => {
      state.error = 'Error loading comments';
    });
    builder.addCase(
      addComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.comments.push(action.payload);
      },
    );
    /* eslint-enable no-param-reassign */
  },
});

export default CommentsSlice.reducer;
export const { toggleVisible } = CommentsSlice.actions;
