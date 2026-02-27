import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getPostComments,
  createComment,
  deleteComment,
} from '../../api/comments';
import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';

type CommentsState = {
  items: Comment[] | null;
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk('comments/init', async (post: Post) => {
  return getPostComments(post.id);
});

export const addComment = createAsyncThunk(
  'comments/add',
  async (data: Omit<Comment, 'id'>) => {
    const newComment = await createComment(data);

    return newComment;
  },
);

export const removeComment = createAsyncThunk(
  'comments/remove',
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
    builder
      .addCase(init.pending, state => {
        state.loaded = false; // eslint-disable-line no-param-reassign
        state.items = null; // eslint-disable-line no-param-reassign
        state.hasError = false; // eslint-disable-line no-param-reassign
      })
      .addCase(init.fulfilled, (state, action) => {
        state.loaded = true; // eslint-disable-line no-param-reassign
        state.items = action.payload; // eslint-disable-line no-param-reassign
      })
      .addCase(init.rejected, state => {
        state.loaded = true; // eslint-disable-line no-param-reassign
        state.hasError = true; // eslint-disable-line no-param-reassign
      })
      .addCase(addComment.pending, state => {
        state.hasError = false; // eslint-disable-line no-param-reassign
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items?.push(action.payload);
      })
      .addCase(addComment.rejected, state => {
        state.hasError = true; // eslint-disable-line no-param-reassign
      })
      .addCase(
        removeComment.fulfilled,
        (state, action: PayloadAction<number>) => {
          if (state.items) {
            // eslint-disable-line no-param-reassign
            // eslint-disable-next-line no-param-reassign
            state.items = state.items.filter(
              comment => comment.id !== action.payload,
            );
          }
        },
      )
      .addCase(removeComment.rejected, state => {
        state.hasError = true; // eslint-disable-line no-param-reassign
      });
  },
});

export default commentsSlice.reducer;
