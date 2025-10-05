/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/indent */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  createComment,
  getPostComments,
  deleteComment,
} from '../../api/comments';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
  visible: boolean;
};

export type CommentAddValues = {
  postId: number;
  name: string;
  email: string;
  body: string;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
  visible: false,
};

// eslint-disable-next-line @typescript-eslint/indent
export const fetchPostComments = createAsyncThunk<
  Comment[],
  number,
  { rejectValue: string }
>('comments/fetchPostComments', async (postId: number, { rejectWithValue }) => {
  try {
    const res = await getPostComments(postId);

    return res as Comment[];
  } catch (err) {
    return rejectWithValue('Network error');
  }
});

// eslint-disable-next-line @typescript-eslint/indent
export const addPostComment = createAsyncThunk<
  Comment,
  CommentAddValues,
  { rejectValue: string }
>('comments/addPostComment', async (CommentAddValues, { rejectWithValue }) => {
  try {
    const res = await createComment(CommentAddValues);

    return res as Comment;
  } catch (err) {
    return rejectWithValue('Network error');
  }
});

export const deletePostComment = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>(
  'comments/deletePostComment',
  async (commentId: number, { rejectWithValue }) => {
    try {
      await deleteComment(commentId);

      return commentId;
    } catch (err) {
      return rejectWithValue('Network error');
    }
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: () => initialState,
    setModalVisible: state => {
      state.visible = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPostComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
        state.visible = false; // Hide the form when loading new comments
      })
      .addCase(fetchPostComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.hasError = false;
        state.items = action.payload;
      })
      .addCase(fetchPostComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
        state.items = [];
      })
      .addCase(addPostComment.pending, state => {
        state.hasError = false;
        // Don't change loaded state - keep form visible during submission
      })
      .addCase(addPostComment.fulfilled, (state, action) => {
        state.loaded = true;
        state.hasError = false;
        state.items.push(action.payload); // Add the new comment to the list
      })
      .addCase(addPostComment.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(deletePostComment.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(deletePostComment.fulfilled, (state, action) => {
        state.loaded = true;
        state.hasError = false;
        // Remove the deleted comment from the list
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
      })
      .addCase(deletePostComment.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { clearComments, setModalVisible } = commentsSlice.actions;

export default commentsSlice.reducer;
