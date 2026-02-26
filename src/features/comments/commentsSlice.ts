import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getPostComments,
  createComment,
  deleteComment,
} from '../../api/comments';
import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';

type CommentsState = {
  comments: Comment[] | null;
  loaded: boolean;
  submitted: boolean;
  error: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  submitted: true,
  error: false,
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
        state.comments = null; // eslint-disable-line no-param-reassign
        state.error = false; // eslint-disable-line no-param-reassign
      })
      .addCase(init.fulfilled, (state, action) => {
        state.loaded = true; // eslint-disable-line no-param-reassign
        state.comments = action.payload; // eslint-disable-line no-param-reassign
      })
      .addCase(init.rejected, state => {
        state.loaded = true; // eslint-disable-line no-param-reassign
        state.error = true; // eslint-disable-line no-param-reassign
      })
      .addCase(addComment.pending, state => {
        state.submitted = false; // eslint-disable-line no-param-reassign
        state.error = false; // eslint-disable-line no-param-reassign
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.submitted = true; // eslint-disable-line no-param-reassign
        state.comments?.push(action.payload);
      })
      .addCase(addComment.rejected, state => {
        state.error = true; // eslint-disable-line no-param-reassign
        state.submitted = true; // eslint-disable-line no-param-reassign
      })
      .addCase(
        removeComment.fulfilled,
        (state, action: PayloadAction<number>) => {
          if (state.comments) {
            state.comments = state.comments.filter(
              // eslint-disable-line no-param-reassign

              comment => comment.id !== action.payload,
            );
          }
        },
      )
      .addCase(removeComment.rejected, state => {
        state.error = true; // eslint-disable-line no-param-reassign
      });
  },
});

export default commentsSlice.reducer;
