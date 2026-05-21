import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createComment, getPostComments } from '../../api/comments';
import { Comment, CommentData } from '../../types/Comment';
import { deleteComment as delComp } from '../../api/comments';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};
const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchCommentsByPost = createAsyncThunk(
  'comments/fetchCommentsByPost',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments as Comment[];
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ postId, data }: { postId: number; data: CommentData }) => {
    const newComment = await createComment({ ...data, postId });

    return newComment as Comment;
  },
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await delComp(commentId);

    return commentId as number;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: state => {
      // eslint-disable-next-line no-param-reassign
      state.items = [];
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
      // eslint-disable-next-line no-param-reassign
      state.hasError = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCommentsByPost.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.items = [];
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
      // eslint-disable-next-line no-param-reassign
      state.hasError = false;
    });
    builder.addCase(
      fetchCommentsByPost.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        // eslint-disable-next-line no-param-reassign
        state.items = action.payload;
        // eslint-disable-next-line no-param-reassign
        state.loaded = false;
        // eslint-disable-next-line no-param-reassign
        state.hasError = false;
      },
    );
    builder.addCase(fetchCommentsByPost.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
      // eslint-disable-next-line no-param-reassign
      state.hasError = true;
    });

    builder.addCase(
      addComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        // eslint-disable-next-line no-param-reassign
        state.items.push(action.payload);
      },
    );

    builder.addCase(
      deleteComment.fulfilled,
      (state, action: PayloadAction<number>) => {
        // eslint-disable-next-line no-param-reassign
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
      },
    );
  },
});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
