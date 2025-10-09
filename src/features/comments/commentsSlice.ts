import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment, CommentData } from './../../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

export interface CommentsState {
  comments: Comment[];
  loading: boolean;
  error: boolean;
}

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: false,
};

export const fetchPostComments = createAsyncThunk(
  'comments/fetchPostComments',
  async (postId: number) => {
    const items = await getPostComments(postId);

    return items;
  },
);

export const addPostComments = createAsyncThunk(
  'comments/addPostComments',
  async ({ postId, data }: { postId: number; data: CommentData }) => {
    const newItem = await createComment({ postId, ...data });

    return newItem;
  },
);

export const deletePostComments = createAsyncThunk(
  'comments/deletePostComments',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
  },

  extraReducers: builder => {
    builder.addCase(fetchPostComments.pending, state => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(fetchPostComments.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action.payload;
      state.error = false;
    });

    builder.addCase(fetchPostComments.rejected, state => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(
      addPostComments.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        // state.loading = false;
        state.comments.push(action.payload);
        // state.error = false;
      },
    );

    builder.addCase(
      deletePostComments.fulfilled,
      (state, action: PayloadAction<number>) => {
        // state.loading = false;
        state.comments = state.comments.filter(
          comment => comment.id !== action.payload,
        );
        // state.error = false;
      },
    );
  },
});

// export const { addComment } = commentsSlice.actions;
export default commentsSlice.reducer;
