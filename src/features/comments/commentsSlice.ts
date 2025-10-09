import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment, CommentData } from './../../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
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
  reducers: {},

  extraReducers: builder => {
    builder.addCase(fetchPostComments.pending, state => {
      state.loaded = false;
      state.hasError = false;
      state.items = [];
    });

    builder.addCase(fetchPostComments.fulfilled, (state, action) => {
      state.loaded = true;
      state.items = action.payload;
      state.hasError = false;
    });

    builder.addCase(fetchPostComments.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(
      addPostComments.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.items.push(action.payload);
        state.loaded = true;
        state.hasError = false;
      },
    );

    builder.addCase(addPostComments.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(
      deletePostComments.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
        state.loaded = true;
        state.hasError = false;
      },
    );

    builder.addCase(deletePostComments.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export default commentsSlice.reducer;
