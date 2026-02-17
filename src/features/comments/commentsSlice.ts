/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';
import { createComment, getPostComments } from '../../api/comments';
import { deleteComment } from '../../api/comments';

type CommentsState = {
  items: Comment[] | null;
  loaded: boolean;
  submitted: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: null,
  loaded: false,
  submitted: true,
  hasError: false,
};

export const init = createAsyncThunk('comments/fetch', (post: Post) => {
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
  'comments/delete',
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
        state.loaded = false;
        state.items = null;
        state.hasError = false;
      })
      .addCase(init.fulfilled, (state, action: PayloadAction<Comment[]>) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(init.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(addComment.pending, state => {
        state.submitted = false;
        state.hasError = false;
      })
      .addCase(
        addComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.submitted = true;
          state.items?.push(action.payload);
        },
      )
      .addCase(addComment.rejected, state => {
        state.submitted = true;
        state.hasError = true;
      })
      .addCase(
        removeComment.fulfilled,
        (state, action: PayloadAction<number>) => {
          if (state.items) {
            state.items = state.items.filter(
              comment => comment.id !== action.payload,
            );
          }
        },
      )
      .addCase(removeComment.rejected, state => {
        state.hasError = true;
      });
  },
});

export default commentsSlice.reducer;
